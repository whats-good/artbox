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
import { PrismaClient, Token } from '@prisma/client';

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

builder.prismaObject('ChainAccount', {
  name: 'ChainAccount',
  fields: (t) => ({
    address: t.exposeID('address'),
    tokens: t.relation('tokens', {}),
  }),
});

builder.prismaObject('SmartContract', {
  name: 'SmartContract',
  fields: (t) => ({
    address: t.exposeID('address'),
    name: t.exposeString('name', {
      nullable: true,
    }),
    symbol: t.exposeString('symbol', {
      nullable: true,
    }),
    decimals: t.exposeInt('decimals', {
      nullable: true,
    }),
    tokens: t.relation('tokens', {}),
  }),
});

builder.prismaObject('Token', {
  name: 'Token',
  fields: (t) => ({
    id: t.exposeID('id', {
      description: 'The global id of the token',
    }),
    tokenId: t.exposeString('tokenId', {
      description: 'The local id of the token within the contract',
    }),
    smartContract: t.relation('smartContract', {}),
    owner: t.relation('owner', {}),
    imageURL: t.exposeString('imageURL', {
      nullable: true,
    }),
  }),
});

builder.queryType({
  fields: (t) => ({
    smartContract: t.prismaField({
      errors: {
        types: [NotFoundError],
        directResult: false,
      },
      type: 'SmartContract',
      args: {
        address: t.arg.string({
          required: true,
        }),
      },
      resolve: async (query, _, { address }) => {
        // TODO: findUnique should return "OR NULL"
        const contract = await prismaClient.smartContract.findUnique({
          ...query,
          where: {
            address,
          },
        });
        if (!contract) {
          throw new NotFoundError();
        }
        return contract;
      },
    }),
    chainAccount: t.prismaField({
      errors: {
        types: [NotFoundError],
        directResult: false,
      },
      type: 'ChainAccount',
      args: {
        address: t.arg.string({
          required: true,
        }),
      },
      resolve: async (query, _, { address }) => {
        // TODO: findUnique should return "OR NULL"
        const account = await prismaClient.chainAccount.findUnique({
          ...query,
          where: {
            address,
          },
        });
        if (!account) {
          throw new NotFoundError();
        }
        return account;
      },
    }),
    token: t.prismaField({
      errors: {
        types: [NotFoundError],
        directResult: false,
      },
      type: 'Token',
      args: {
        id: t.arg.string({
          required: false,
        }),
        contractAddress: t.arg.string({
          required: false,
        }),
        tokenId: t.arg.string({
          required: false,
        }),
      },
      resolve: async (query, _, { id, contractAddress, tokenId }) => {
        // TODO: findUnique should return "OR NULL"
        let token: Token;
        if (id) {
          token = await prismaClient.token.findUnique({
            ...query,
            where: {
              id,
            },
          });
        } else if (contractAddress && tokenId) {
          token = await prismaClient.token.findUnique({
            ...query,
            where: {
              tokenId_contractAddress: {
                tokenId,
                contractAddress,
              },
            },
          });
        } else {
          // TODO: throw a bad input union error here
        }
        if (!token) {
          throw new NotFoundError();
        }
        return token;
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
