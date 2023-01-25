// import { createServer } from '@graphql-yoga/node';
import SchemaBuilder from '@pothos/core';
import ErrorsPlugin from '@pothos/plugin-errors';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { PrismaClient } from '@prisma/client';
import { ethers } from 'ethers';
import * as express from 'express';
import { createYoga } from 'graphql-yoga';
import { generateNonce, SiweMessage } from 'siwe';
import Session from 'express-session';

export class ArtBoxBaseError extends Error {}

export class UnknownError extends ArtBoxBaseError {}

export class NotFoundError extends ArtBoxBaseError {
  constructor(message?: string) {
    super(message || 'Object not found');
  }
}

// Infura Endpoint
// https://mainnet.infura.io/v3/769e786d4b7d41ae86475b916510b455

// async function authorize(req, context) {
//   const signature = req.headers['x-ethereum-signature'];
//   if (!signature) {
//     throw new Error('No Ethereum signature provided');
//   }

//   const provider = new ethers.providers.JsonRpcProvider(
//     'https://mainnet.infura.io/v3/769e786d4b7d41ae86475b916510b455',
//   );

//   const recoveredAddress = ethers.utils.verifyMessage();

//   //Check if recovered address matches arg address

//   // Use the address to look up the user in a database or smart contract
//   const user = await users.findByAddress(address);

//   if (!user) {
//     throw new Error('Invalid Ethereum address');
//   }
// }

// TODO: this should come from a factory via nest
const prismaClient = new PrismaClient({});

// TODO: the builder should be a part of the nest factory chain
const builder = new SchemaBuilder<{
  Context: {
    user: string;
  };
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
        take: t.arg.int({
          required: false,
          defaultValue: 10,
        }),
        cursor: t.arg.int({
          required: false,
          defaultValue: 1,
        }),
      },
      type: [User],
      resolve: async (query, _, { take, cursor }) => {
        const users = await prismaClient.user.findMany({
          ...query,
          take: take,
          cursor: {
            id: cursor,
          },
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
      resolve: async (root, args, context) => {
        const digest = ethers.utils.arrayify(ethers.utils.hashMessage('sam'));
        // const output = ethers.utils.verifyMessage('hello sam', context.user);

        // console.log(output === '0x5D0f971BCDd15A222A7776d0171225ccfE5EEadE');
        // console.log('ACTUAL: ', output);
        console.log('EXPECTED: ', '0x5D0f971BCDd15A222A7776d0171225ccfE5EEadE');

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

const app = express();

const yoga = createYoga({
  schema: builder.toSchema(),
  maskedErrors: process.env.NODE_ENV === 'production',
  // context: async ({ req }) => ({
  //   user: req.headers['x-ethereum-signature'],
  // }),
  // context: { req },
});

app.use(
  Session({
    name: 'siwe-quickstart',
    secret: 'siwe-quickstart-secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: true },
  }),
);

app.use('/graphql', yoga);

app.get('/nonce', async function (req, res) {
  req.session.nonce = generateNonce();
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(req.session.nonce);
});

app.post('/verify', async function (req, res) {
  try {
    if (!req.body.message) {
      res
        .status(422)
        .json({ message: 'Expected prepareMessage object as body.' });
      return;
    }

    const message = new SiweMessage(req.body.message);
    const fields = await message.validate(req.body.signature);
    if (fields.nonce !== req.session.nonce) {
      console.log(req.session);
      res.status(422).json({
        message: `Invalid nonce.`,
      });
      return;
    }
    req.session.siwe = fields;
    req.session.cookie.expires = new Date(fields.expirationTime);
    req.session.save(() => res.status(200).end());
  } catch (e) {
    req.session.siwe = null;
    req.session.nonce = null;
    console.error(e);
    switch (e) {
      case ErrorTypes.EXPIRED_MESSAGE: {
        req.session.save(() => res.status(440).json({ message: e.message }));
        break;
      }
      case ErrorTypes.INVALID_SIGNATURE: {
        req.session.save(() => res.status(422).json({ message: e.message }));
        break;
      }
      default: {
        req.session.save(() => res.status(500).json({ message: e.message }));
        break;
      }
    }
  }
});

app.listen(4001, () => {
  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
});

// const server = createServer({
//   schema: builder.toSchema(),
//   maskedErrors: false, // TODO: turn this off on prod
//   port: 4001, // TODO: this should come from config
//   context: async ({ req }) => ({
//     user: req.headers['x-ethereum-signature'],
//   }),
// });

// server.start();
