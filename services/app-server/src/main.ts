// import type { SmartContract } from './../prisma/@prisma/client/index.d';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from '@/modules/app/app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

import { createServer } from '@graphql-yoga/node';
import SchemaBuilder from '@pothos/core';
import ErrorsPlugin from '@pothos/plugin-errors';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { PrismaClient } from '@prisma/client';

export class ArtBoxBaseError extends Error {}

export class UnknownError extends ArtBoxBaseError {}

export class NotFoundError extends ArtBoxBaseError {
  constructor(message?: string) {
    super(message || 'Object not found');
  }
}

// TODO: this should come from a factory via nest
const prismaClient = new PrismaClient({});

// TODO: the builder should be a part of the nest factory chain
const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
}>({
  notStrict:
    'Pothos may not work correctly when strict mode is not enabled in tsconfig.json',
  plugins: [PrismaPlugin, ErrorsPlugin],
  errorOptions: {
    defaultTypes: [UnknownError],
    directResult: false,
  },
  prisma: {
    client: prismaClient,
  },
});

const IError = builder.interfaceRef<ArtBoxBaseError>('IError').implement({
  description: 'Base error interface',
  fields: (t) => ({
    message: t.exposeString('message', {}),
  }),
});

builder.objectType(NotFoundError, {
  name: 'NotFoundError',
  description: 'Error thrown when a resource is not found',
  interfaces: [IError],
});

builder.objectType(UnknownError, {
  name: 'UnknownError',
  description: 'Error thrown when an unknown error occurs',
  interfaces: [IError],
});

const User = builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    address: t.exposeString('address'),
    username: t.exposeString('username'),
    description: t.exposeString('description'),
    contracts: t.field({
      select: (args, ctx, nestedSelection) => ({
        contracts: {
          select: {
            smartContract: nestedSelection(true),
          },
        },
      }),
      type: [SmartContract],
      resolve: (user) =>
        user.contracts.map(({ smartContract }) => {
          return smartContract;
        }),
    }),
  }),
});

const SmartContract = builder.prismaObject('SmartContract', {
  name: 'SmartContract',
  fields: (t) => ({
    id: t.exposeID('id'),
    contractAddress: t.exposeString('contractAddress'),
    network: t.relation('network', {}),
    users: t.relation('users', {}),
  }),
});

builder.prismaObject('Network', {
  name: 'Network',
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
  }),
});

builder.prismaObject('UserOnContract', {
  name: 'UserOnContract',
  fields: (t) => ({
    id: t.exposeID('id'),
    smartContractId: t.exposeInt('smartContractId'),
    userId: t.exposeInt('userId'),
  }),
});

builder.queryType({
  fields: (t) => ({
    user: t.prismaField({
      errors: {
        types: [NotFoundError],
        directResult: false,
      },
      type: 'User',
      args: {
        username: t.arg.string({
          required: true,
        }),
      },
      resolve: async (query, _, { username }) => {
        const user = await prismaClient.user.findUnique({
          ...query,
          where: {
            username: username,
          },
        });
        if (!user) {
          throw new NotFoundError();
        }
        return user;
      },
    }),
    discoverUsers: t.prismaField({
      errors: {
        types: [NotFoundError],
        directResult: false,
      },
      args: {
        page: t.arg.int({
          required: false,
        }),
      },
      type: [User],
      resolve: async (query, _, { page }) => {
        const users = await prismaClient.user.findMany({
          ...query,
          take: 10,
        });
        if (!users) {
          throw new NotFoundError();
        }
        return users;
      },
    }),
  }),
});

const UserInput = builder.inputType('UserInput', {
  fields: (t) => ({
    username: t.string({ required: true }),
    address: t.string({ required: true }),
    description: t.string({ required: false }),
  }),
});

const ContractInput = builder.inputType('ContractInput', {
  fields: (t) => ({
    userAddress: t.string({ required: true }),
    contractAddress: t.string({ required: true }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    createUser: t.field({
      type: User,
      args: {
        input: t.arg({ type: UserInput, required: true }),
      },
      resolve: async (root, args) => {
        const user = await prismaClient.user.upsert({
          where: { address: args.input.address },
          update: {
            address: args.input.address,
            username: args.input.username,
            description: args.input.description,
          },
          create: {
            address: args.input.address,
            username: args.input.username,
            description: args.input.description,
          },
        });
        if (!user) {
          throw new UnknownError();
        }
        return user;
      },
    }),
    createContract: t.field({
      type: SmartContract,
      args: {
        input: t.arg({ type: ContractInput, required: true }),
      },
      resolve: async (root, args) => {
        const contract = await prismaClient.smartContract.upsert({
          where: { contractAddress: args.input.contractAddress },
          update: {
            contractAddress: args.input.contractAddress,
            network: {
              connect: { name: 'Ethereum' },
            },
          },
          create: {
            contractAddress: args.input.contractAddress,
            network: {
              connect: { name: 'Ethereum' },
            },
          },
        });
        const connectUser = await prismaClient.userOnContract.create({
          data: {
            user: {
              connect: { address: args.input.userAddress },
            },
            smartContract: {
              connect: { contractAddress: args.input.contractAddress },
            },
          },
        });
        if (!connectUser || !contract) {
          throw new UnknownError();
        }
        return contract;
      },
    }),
  }),
});

const server = createServer({
  schema: builder.toSchema(),
  maskedErrors: false, // TODO: turn this off on prod
  port: 4001, // TODO: this should come from config
});

server.start();
