import { UnknownError } from '../src/main';
import { prismaClient } from '../src/main';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import SchemaBuilder from '@pothos/core';

export const deleteContractResolver = async (root, args, { userAddress }) => {
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
};
