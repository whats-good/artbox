import SchemaBuilder from '@pothos/core';
import ErrorsPlugin from '@pothos/plugin-errors';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { PrismaClient } from '@prisma/client';
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
          required: false,
        }),
        address: t.arg.string({
          required: false,
        }),
      },
      resolve: async (query, _, { username, address }) => {
        if (!username && !address) {
          throw new UnknownError('Must provide either username or address');
        }
        let user = undefined;
        if (address) {
          user = await prismaClient.user.findUnique({
            ...query,
            where: {
              address: address,
            },
          });
        }
        if (username) {
          user = await prismaClient.user.findUnique({
            ...query,
            where: {
              username: username,
            },
          });
        }
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
      resolve: async (root, args, { userAddress }) => {
        if (!userAddress) {
          throw new UnknownError('No session token');
        }
        if (userAddress !== args.input.address) {
          throw new UnknownError('Authenticated adress does not match arg');
        }
        const user = await prismaClient.user.upsert({
          where: { address: userAddress },
          update: {
            address: userAddress,
            username: args.input.username,
            description: args.input.description,
          },
          create: {
            address: userAddress,
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
      resolve: async (root, args, { userAddress }) => {
        if (!userAddress) {
          throw new UnknownError('No session token');
        }
        if (userAddress !== args.input.userAddress) {
          throw new UnknownError('Authenticated adress does not match arg');
        }
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

        const { id } = await prismaClient.user.findUnique({
          where: {
            address: userAddress,
          },
        });

        const connectUser = await prismaClient.userOnContract.upsert({
          where: {
            unique_combo: {
              smartContractId: contract.id,
              userId: id,
            },
          },
          create: {
            user: {
              connect: { address: userAddress },
            },
            smartContract: {
              connect: { contractAddress: args.input.contractAddress },
            },
          },
          update: {
            user: {
              connect: { address: userAddress },
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
    deleteContract: t.field({
      type: SmartContract,
      args: {
        input: t.arg({ type: ContractInput, required: true }),
      },
      resolve: async (root, args, { userAddress }) => {
        if (!userAddress) {
          throw new UnknownError('No session token');
        }
        if (userAddress !== args.input.userAddress) {
          throw new UnknownError('Authenticated adress does not match arg');
        }
        const contract = await prismaClient.smartContract.findUnique({
          where: {
            contractAddress: args.input.contractAddress,
          },
        });
        const user = await prismaClient.user.findUnique({
          where: {
            address: userAddress,
          },
        });
        const deletedRelation = await prismaClient.userOnContract.delete({
          where: {
            unique_combo: {
              userId: user.id,
              smartContractId: contract.id,
            },
          },
        });
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
  // maskedErrors: process.env.NODE_ENV === 'production',
  maskedErrors: false,
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
  console.log('Nonce Invoked');
  req.session.nonce = generateNonce();
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(req.session.nonce);
});

app.post('/verify', async function (req, res) {
  console.log('Verify Invoked');
  try {
    if (!req.body.message) {
      res
        .status(422)
        .json({ message: 'Expected prepareMessage object as body.' });
      return;
    }

    const message = new SiweMessage(req.body.message);
    const fields = await message.validate(req.body.signature);
    console.log('Fields.nonce: ', fields.nonce);
    console.log('req.session.nonce: ', req.session.nonce);
    console.log('req.session ID: ', req.session.id);
    console.log('req.session: ', req.session);
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
