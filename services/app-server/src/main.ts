import SchemaBuilder from '@pothos/core';
import ErrorsPlugin from '@pothos/plugin-errors';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { prisma, PrismaClient } from '@prisma/client';
import { createYoga } from 'graphql-yoga';
import { generateNonce, SiweMessage } from 'siwe';
import session from 'express-session';
import express from 'express';
import cors from 'cors';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';

export class ArtBoxBaseError extends Error {}

export class UnknownError extends ArtBoxBaseError {}

export class NotFoundError extends ArtBoxBaseError {
  constructor(message?: string) {
    super(message || 'Object not found');
  }
}

declare module 'express-session' {
  interface SessionData {
    siwe: SiweMessage;
    nonce: string;
  }
}

interface YogaContext {
  req: express.Request;
}
// & Record<string, any>

// TODO: this should come from a factory via nest
export const prismaClient = new PrismaClient({});

// TODO: the builder should be a part of the nest factory chain
const builder = new SchemaBuilder<{
  Context: {
    userAddress?: string;
    signedIn: boolean;
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
    description: t.exposeString('description', { nullable: true }),
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
      type: User,
      args: {
        username: t.arg.string({
          required: true,
        }),
      },
      resolve: async (query, _, { username }) => {
        try {
          const user = await prismaClient.user.findUnique({
            ...query,
            where: {
              username: username,
            },
          });
          return user;
        } catch (e) {
          throw new UnknownError('Error while fetching user.');
        }
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
        try {
          const users = await prismaClient.user.findMany({
            ...query,
            take: take,
            cursor: {
              id: cursor,
            },
          });
          return users;
        } catch (e) {
          throw new NotFoundError();
        }
      },
    }),
    getAccounts: t.prismaField({
      errors: {
        types: [NotFoundError],
        directResult: false,
      },
      args: {
        address: t.arg.string({
          required: true,
        }),
      },
      type: [User],
      resolve: async (query, _, { address }) => {
        try {
          const users = await prismaClient.user.findMany({
            where: {
              address: address,
            },
            take: 10,
          });
          return users;
        } catch (e) {
          throw new NotFoundError();
        }
      },
    }),
  }),
});

const UserInput = builder.inputType('UserInput', {
  fields: (t) => ({
    username: t.string({ required: true }),
    address: t.string({ required: true }),
    description: t.string({ required: false }),
    smartContracts: t.stringList({ required: false }),
  }),
});

const EditUserInput = builder.inputType('EditUserInput', {
  fields: (t) => ({
    username: t.string({ required: true }),
    address: t.string({ required: false }),
    description: t.string({ required: false }),
  }),
});

const ContractInput = builder.inputType('ContractInput', {
  fields: (t) => ({
    username: t.string({ required: true }),
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
      resolve: async (root, args, { userAddress }) => {
        if (!userAddress) {
          throw new UnknownError('No session token');
        }
        if (userAddress !== args.input.address) {
          throw new UnknownError('Authenticated address does not match arg');
        }

        //Check if the username is available
        try {
          await prismaClient.user.findUniqueOrThrow({
            where: { username: args.input.username },
          });
        } catch (e) {
          throw new UnknownError('Sorry, this username already exists.');
        }

        let user;

        //Create User
        try {
          user = await prismaClient.user.create({
            data: {
              username: args.input.username,
              address: userAddress,
              description: args.input.description,
            },
          });
        } catch (e) {
          throw new UnknownError('Unable to create User');
        }

        try {
          if (args.input.smartContracts.length) {
            for (let i = 0; i < args.input.smartContracts.length; i++) {
              const contract = await prismaClient.smartContract.upsert({
                where: { contractAddress: args.input.smartContracts[i] },
                update: {
                  contractAddress: args.input.smartContracts[i],
                  network: {
                    connect: { name: 'Ethereum' },
                  },
                },
                create: {
                  contractAddress: args.input.smartContracts[i],
                  network: {
                    connect: { name: 'Ethereum' },
                  },
                },
              });

              const connectUser = await prismaClient.userOnContract.upsert({
                where: {
                  unique_combo: {
                    smartContractId: contract.id,
                    userId: user.id,
                  },
                },
                create: {
                  user: {
                    connect: { username: args.input.username },
                  },
                  smartContract: {
                    connect: { contractAddress: args.input.smartContracts[i] },
                  },
                },
                update: {
                  user: {
                    connect: { username: args.input.username },
                  },
                  smartContract: {
                    connect: { contractAddress: args.input.smartContracts[i] },
                  },
                },
              });
            }
          }
        } catch (e) {
          throw new UnknownError();
        }
        return user;
      },
    }),
    editUser: t.field({
      type: User,
      args: {
        input: t.arg({ type: EditUserInput, required: true }),
      },
      resolve: async (root, args, { userAddress }) => {
        if (!userAddress) {
          throw new UnknownError('No session token');
        }
        //Check if the username belongs to the authenticated address
        try {
          const checkedUsername = await prismaClient.user.findUniqueOrThrow({
            where: {
              username: args.input.username,
            },
          });
          if (checkedUsername.address !== userAddress) {
            throw new UnknownError('Username does not belong to address');
          }
        } catch (e) {
          throw new UnknownError('Username does not exist');
        }

        //Update the user
        try {
          const user = await prismaClient.user.update({
            where: {
              username: args.input.username,
            },
            data: {
              description: args.input.description,
            },
          });
          return user;
        } catch (e) {
          throw new UnknownError('Unable to update user');
        }
      },
    }),
    createContract: t.field({
      type: SmartContract,
      args: {
        input: t.arg({ type: ContractInput, required: true }),
      },
      resolve: async (root, args, { userAddress }) => {
        if (!userAddress) {
          throw new UnknownError('No session token');
        }

        let user;
        let contract;
        let connected;

        //Confirm the username belongs to the authenticated address
        try {
          user = await prismaClient.user.findUniqueOrThrow({
            where: {
              username: args.input.username,
            },
          });
          if (user.address !== userAddress) {
            throw new UnknownError('Username does not belong to address');
          }
        } catch (e) {
          throw new UnknownError('Username does not exist');
        }

        //Create the contract in DB (If doesn't alreadt exist)
        try {
          contract = await prismaClient.smartContract.upsert({
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
        } catch (e) {
          throw new UnknownError('Unable to create contract');
        }

        //Connect the contract with user via UserOnContract join table
        try {
          connected = await prismaClient.userOnContract.upsert({
            where: {
              unique_combo: {
                smartContractId: contract.id,
                userId: user.id,
              },
            },
            create: {
              user: {
                connect: { username: args.input.username },
              },
              smartContract: {
                connect: { contractAddress: args.input.contractAddress },
              },
            },
            update: {
              user: {
                connect: { username: args.input.username },
              },
              smartContract: {
                connect: { contractAddress: args.input.contractAddress },
              },
            },
          });
        } catch (e) {
          throw new UnknownError('Unable to link contract to user');
        }
        if (!connected || !contract || !user) {
          throw new UnknownError();
        }
        return contract;
      },
    }),
    deleteContract: t.field({
      type: SmartContract,
      args: {
        input: t.arg({ type: ContractInput, required: true }),
      },
      resolve: async (root, args, { userAddress }) => {
        if (!userAddress) {
          throw new UnknownError('No session token');
        }

        let user;
        let contract;
        let deletedRelation;

        //Confirm the username belongs to the authenticated address
        try {
          user = await prismaClient.user.findUniqueOrThrow({
            where: {
              username: args.input.username,
            },
          });
          if (user.address !== userAddress) {
            throw new UnknownError('Username does not belong to address');
          }
        } catch (e) {
          throw new UnknownError('Username does not exist');
        }

        //Get contract ID
        try {
          contract = await prismaClient.smartContract.findUnique({
            where: {
              contractAddress: args.input.contractAddress,
            },
          });
        } catch (e) {
          throw new UnknownError('Unable to find contract address');
        }

        //Delete the Relation
        try {
          deletedRelation = await prismaClient.userOnContract.delete({
            where: {
              unique_combo: {
                userId: user.id,
                smartContractId: contract.id,
              },
            },
          });
        } catch (e) {
          throw new UnknownError('Unable to delete contract linked to account');
        }

        if (!deletedRelation || !contract || !user) {
          throw new UnknownError();
        }
        return contract;
      },
    }),
  }),
});

const yoga = createYoga({
  schema: builder.toSchema(),
  maskedErrors: process.env.NODE_ENV === 'production',
  cors: {
    origin: [
      process.env.CLIENT_URL,
      `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}`,
    ],
    credentials: true,
  },
  context: async ({ req }: any) => {
    if (!req.session) {
      return {
        signedIn: false,
        userAddress: undefined,
      };
    }
    if (req.session.siwe?.address) {
      return {
        userAddress: req.session.siwe.address,
        signedIn: true,
      };
    }
    return {
      userAddress: undefined,
      signedIn: true,
    };
  },
});

const app = express();

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}`,
    ],
    credentials: true,
  }),
);

app.use(
  session({
    name: 'siwe',
    rolling: true,
    secret: process.env.EXP_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : false,
      maxAge: 6000000,
    },
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 10000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
      enableConcurrentSetInvocationsForSameSessionID: true,
      enableConcurrentTouchInvocationsForSameSessionID: true,
    }),
  }),
);

app.use('/graphql', yoga);

app.use(express.json());
app.set('trust proxy', 1);

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
      res.status(422).json({
        message: `Invalid nonce.`,
      });
      return;
    }
    req.session.siwe = fields;
    // req.session.cookie.expires = new Date(fields.expirationTime);
    req.session.save(() => res.status(200).end());
  } catch (e) {
    req.session.siwe = null;
    req.session.nonce = null;
    console.error(e);
    req.session.save(() => res.status(440).json({ message: e }));
  }
});

app.listen(process.env.PORT || 4001, () => {
  console.log(
    `Running a GraphQL API server at ${process.env.BACKEND_URL}:${
      process.env.PORT || 4001
    }/graphql`,
  );
});
