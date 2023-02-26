import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

const ACCOUNTS = {
  SAM: {
    address: '0x5D0f971BCDd15A222A7776d0171225ccfE5EEadE',
    username: 'cool_Sam',
    bio: 'This is sam, welcome to my cool account. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  LOGAN: {
    address: '0x0eC5AB19714ba9e5681aD2B4C46D56ed0cFB1656',
    username: 'Oxlogan',
    bio: 'Welcome to my cool art account! Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
};

const SMART_CONTRACTS = {
  CONTRACT_ONE: '0x713ce7dE2296c1d48b61d5662fd381DEDfcB01bD',
  CONTRACT_TWO: '0x7D70D50A8E9D1B4F04F5a2fA2e46078DA9EBB467',
  CONTRACT_THREE: '0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e',
  CONTRACT_FOUR: '0x49623cAEc21B1fF5D04d7Bf7B71531369a69bCe4',
};

async function seed() {
  //Create Network
  await prismaClient.network.upsert({
    where: { name: 'Ethereum' },
    update: { name: 'Ethereum' },
    create: { name: 'Ethereum' },
  });
  //Create SmartContracts
  await prismaClient.smartContract.upsert({
    where: { contractAddress: SMART_CONTRACTS.CONTRACT_ONE },
    update: {
      contractAddress: SMART_CONTRACTS.CONTRACT_ONE,
      network: {
        connect: { name: 'Ethereum' },
      },
    },
    create: {
      contractAddress: SMART_CONTRACTS.CONTRACT_ONE,
      network: {
        connect: { name: 'Ethereum' },
      },
    },
  });
  await prismaClient.smartContract.upsert({
    where: { contractAddress: SMART_CONTRACTS.CONTRACT_TWO },
    update: {
      contractAddress: SMART_CONTRACTS.CONTRACT_TWO,
      network: {
        connect: { name: 'Ethereum' },
      },
    },
    create: {
      contractAddress: SMART_CONTRACTS.CONTRACT_TWO,
      network: {
        connect: { name: 'Ethereum' },
      },
    },
  });
  await prismaClient.smartContract.upsert({
    where: { contractAddress: SMART_CONTRACTS.CONTRACT_THREE },
    update: {
      contractAddress: SMART_CONTRACTS.CONTRACT_THREE,
      network: {
        connect: { name: 'Ethereum' },
      },
    },
    create: {
      contractAddress: SMART_CONTRACTS.CONTRACT_THREE,
      network: {
        connect: { name: 'Ethereum' },
      },
    },
  });
  await prismaClient.smartContract.upsert({
    where: { contractAddress: SMART_CONTRACTS.CONTRACT_FOUR },
    update: {
      contractAddress: SMART_CONTRACTS.CONTRACT_FOUR,
      network: {
        connect: { name: 'Ethereum' },
      },
    },
    create: {
      contractAddress: SMART_CONTRACTS.CONTRACT_FOUR,
      network: {
        connect: { name: 'Ethereum' },
      },
    },
  });
  //Create Users
  await prismaClient.user.upsert({
    where: { username: ACCOUNTS.SAM.username },
    update: {
      address: ACCOUNTS.SAM.address,
      username: ACCOUNTS.SAM.username,
      description: ACCOUNTS.SAM.bio,
    },
    create: {
      address: ACCOUNTS.SAM.address,
      username: ACCOUNTS.SAM.username,
      description: ACCOUNTS.SAM.bio,
    },
  });
  await prismaClient.user.upsert({
    where: { username: ACCOUNTS.LOGAN.username },
    update: {
      address: ACCOUNTS.LOGAN.address,
      username: ACCOUNTS.LOGAN.username,
      description: ACCOUNTS.LOGAN.bio,
    },
    create: {
      address: ACCOUNTS.LOGAN.address,
      username: ACCOUNTS.LOGAN.username,
      description: ACCOUNTS.LOGAN.bio,
    },
  });
  //Connect Users to their liked contracts
  await prismaClient.userOnContract.create({
    data: {
      user: {
        connect: { username: ACCOUNTS.SAM.username },
      },
      smartContract: {
        connect: { contractAddress: SMART_CONTRACTS.CONTRACT_ONE },
      },
    },
  });
  await prismaClient.userOnContract.create({
    data: {
      user: {
        connect: { username: ACCOUNTS.SAM.username },
      },
      smartContract: {
        connect: { contractAddress: SMART_CONTRACTS.CONTRACT_TWO },
      },
    },
  });
  await prismaClient.userOnContract.create({
    data: {
      user: {
        connect: { username: ACCOUNTS.LOGAN.username },
      },
      smartContract: {
        connect: { contractAddress: SMART_CONTRACTS.CONTRACT_ONE },
      },
    },
  });
  await prismaClient.userOnContract.create({
    data: {
      user: {
        connect: { username: ACCOUNTS.LOGAN.username },
      },
      smartContract: {
        connect: { contractAddress: SMART_CONTRACTS.CONTRACT_TWO },
      },
    },
  });
  await prismaClient.userOnContract.create({
    data: {
      user: {
        connect: { username: ACCOUNTS.LOGAN.username },
      },
      smartContract: {
        connect: { contractAddress: SMART_CONTRACTS.CONTRACT_THREE },
      },
    },
  });
  await prismaClient.userOnContract.create({
    data: {
      user: {
        connect: { username: ACCOUNTS.LOGAN.username },
      },
      smartContract: {
        connect: { contractAddress: SMART_CONTRACTS.CONTRACT_FOUR },
      },
    },
  });
}

seed()
  .then(() => {
    console.log('seed completed');
  })
  .catch((e) => {
    console.error(e);
  });
