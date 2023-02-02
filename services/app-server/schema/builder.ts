// import SchemaBuilder from '@pothos/core';
// import ErrorsPlugin from '@pothos/plugin-errors';
// import PrismaPlugin from '@pothos/plugin-prisma';
// import type PrismaTypes from '@pothos/plugin-prisma/generated';
// import { PrismaClient } from '@prisma/client';
// import { SiweMessage } from 'siwe';

// declare module 'express-session' {
//   interface SessionData {
//     siwe: SiweMessage;
//     nonce: string;
//   }
// }

// export class ArtBoxBaseError extends Error {}

// export class UnknownError extends ArtBoxBaseError {}

// export class NotFoundError extends ArtBoxBaseError {
//   constructor(message?: string) {
//     super(message || 'Object not found');
//   }
// }
// // TODO: this should come from a factory via nest
// const prismaClient = new PrismaClient({});

// // TODO: the builder should be a part of the nest factory chain
// const builder = new SchemaBuilder<{
//   Context: Request;
//   PrismaTypes: PrismaTypes;
// }>({
//   notStrict:
//     'Pothos may not work correctly when strict mode is not enabled in tsconfig.json',
//   plugins: [PrismaPlugin, ErrorsPlugin],
//   errorOptions: {
//     defaultTypes: [UnknownError],
//     directResult: false,
//   },
//   prisma: {
//     client: prismaClient,
//   },
// });

// const IError = builder.interfaceRef<ArtBoxBaseError>('IError').implement({
//   description: 'Base error interface',
//   fields: (t) => ({
//     message: t.exposeString('message', {}),
//   }),
// });

// builder.objectType(NotFoundError, {
//   name: 'NotFoundError',
//   description: 'Error thrown when a resource is not found',
//   interfaces: [IError],
// });

// builder.objectType(UnknownError, {
//   name: 'UnknownError',
//   description: 'Error thrown when an unknown error occurs',
//   interfaces: [IError],
// });

// const User = builder.prismaObject('User', {
//   fields: (t) => ({
//     id: t.exposeID('id'),
//     address: t.exposeString('address'),
//     username: t.exposeString('username'),
//     description: t.exposeString('description'),
//     contracts: t.field({
//       select: (args, ctx, nestedSelection) => ({
//         contracts: {
//           select: {
//             smartContract: nestedSelection(true),
//           },
//         },
//       }),
//       type: [SmartContract],
//       resolve: (user) =>
//         user.contracts.map(({ smartContract }) => {
//           return smartContract;
//         }),
//     }),
//   }),
// });

// const SmartContract = builder.prismaObject('SmartContract', {
//   name: 'SmartContract',
//   fields: (t) => ({
//     id: t.exposeID('id'),
//     contractAddress: t.exposeString('contractAddress'),
//     network: t.relation('network', {}),
//     users: t.relation('users', {}),
//   }),
// });

// builder.prismaObject('Network', {
//   name: 'Network',
//   fields: (t) => ({
//     id: t.exposeID('id'),
//     name: t.exposeString('name'),
//   }),
// });

// builder.prismaObject('UserOnContract', {
//   name: 'UserOnContract',
//   fields: (t) => ({
//     id: t.exposeID('id'),
//     smartContractId: t.exposeInt('smartContractId'),
//     userId: t.exposeInt('userId'),
//   }),
// });

// builder.queryType({
//   fields: (t) => ({
//     user: t.prismaField({
//       errors: {
//         types: [NotFoundError],
//         directResult: false,
//       },
//       type: 'User',
//       args: {
//         username: t.arg.string({
//           required: true,
//         }),
//       },
//       resolve: async (query, _, { username }) => {
//         const user = await prismaClient.user.findUnique({
//           ...query,
//           where: {
//             username: username,
//           },
//         });
//         if (!user) {
//           throw new NotFoundError();
//         }
//         return user;
//       },
//     }),
//     discoverUsers: t.prismaField({
//       errors: {
//         types: [NotFoundError],
//         directResult: false,
//       },
//       args: {
//         take: t.arg.int({
//           required: false,
//           defaultValue: 10,
//         }),
//         cursor: t.arg.int({
//           required: false,
//           defaultValue: 1,
//         }),
//       },
//       type: [User],
//       resolve: async (query, _, { take, cursor }) => {
//         const users = await prismaClient.user.findMany({
//           ...query,
//           take: take,
//           cursor: {
//             id: cursor,
//           },
//         });
//         if (!users) {
//           throw new NotFoundError();
//         }
//         return users;
//       },
//     }),
//   }),
// });

// const UserInput = builder.inputType('UserInput', {
//   fields: (t) => ({
//     username: t.string({ required: true }),
//     address: t.string({ required: true }),
//     description: t.string({ required: false }),
//   }),
// });

// const ContractInput = builder.inputType('ContractInput', {
//   fields: (t) => ({
//     userAddress: t.string({ required: true }),
//     contractAddress: t.string({ required: true }),
//   }),
// });

// builder.mutationType({
//   fields: (t) => ({
//     createUser: t.field({
//       type: User,
//       args: {
//         input: t.arg({ type: UserInput, required: true }),
//       },
//       resolve: async (root, args, { session }) => {
//         console.log('createUser invoked. Value of request object: ', session);
//         if (!session.siwe.address) {
//           throw new UnknownError('No session token');
//         }
//         const user = await prismaClient.user.upsert({
//           where: { address: session.siwe.address },
//           update: {
//             address: session.siwe.address,
//             username: args.input.username,
//             description: args.input.description,
//           },
//           create: {
//             address: session.siwe.address,
//             username: args.input.username,
//             description: args.input.description,
//           },
//         });
//         if (!user) {
//           throw new UnknownError();
//         }
//         return user;
//       },
//     }),
//     createContract: t.field({
//       type: SmartContract,
//       args: {
//         input: t.arg({ type: ContractInput, required: true }),
//       },
//       resolve: async (root, args, { session }) => {
//         console.log('createContract Mutation. Request object: ', session);
//         if (!session.siwe.address) {
//           throw new UnknownError('No session token');
//         }
//         const contract = await prismaClient.smartContract.upsert({
//           where: { contractAddress: args.input.contractAddress },
//           update: {
//             contractAddress: args.input.contractAddress,
//             network: {
//               connect: { name: 'Ethereum' },
//             },
//           },
//           create: {
//             contractAddress: args.input.contractAddress,
//             network: {
//               connect: { name: 'Ethereum' },
//             },
//           },
//         });
//         const connectUser = await prismaClient.userOnContract.create({
//           data: {
//             user: {
//               connect: { address: session.siwe.address },
//             },
//             smartContract: {
//               connect: { contractAddress: args.input.contractAddress },
//             },
//           },
//         });
//         if (!connectUser || !contract) {
//           throw new UnknownError();
//         }
//         return contract;
//       },
//     }),
//   }),
// });

// export default builder;