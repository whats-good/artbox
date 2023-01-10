import { prisma, PrismaClient } from '../src/generated/client';
import { v4 as uuidv4 } from 'uuid';

const prismaClient = new PrismaClient();

// a random wallet address

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
  CONTRACT_THREE: '0x7D70D50A8E9D1B4F04F5a2fA2e46078DA9EBB467',
  CONTRACT_FOUR: '0x49623cAEc21B1fF5D04d7Bf7B71531369a69bCe4',
};

async function seed() {
  //Create Network
  await prismaClient.network.create({
    data: {
      name: 'Ethereum',
    },
  });
  //Create SmartContracts
  await prismaClient.smartContract.create({
    data: {
      contractAddress: SMART_CONTRACTS.CONTRACT_ONE,
      network: {
        connect: { name: 'Ethereum' },
      },
    },
  });
  //Create Users
  await prismaClient.user.create({
    data: {
      address: ACCOUNTS.SAM.address,
      username: ACCOUNTS.SAM.username,
      contracts: {
        create: [
          {

          },
        ],
      },
    },
  });

  await prismaClient.smartContract.createMany({
    data: [
      {
        address: SMART_CONTRACTS.CONTRACT_ONE,
        name: 'Smart Contract One',
        symbol: 'SC1',
        decimals: 18,
      },
      {
        address: SMART_CONTRACTS.CONTRACT_TWO,
        name: 'Smart Contract Two',
        symbol: 'SC2',
        decimals: 18,
      },
    ],
  });

  await prismaClient.token.createMany({
    data: [
      {
        id: uuidv4(),
        contractAddress: SMART_CONTRACTS.CONTRACT_ONE,
        ownerAddress: ACCOUNTS.ALICE,
        tokenId: '1',
        imageURL:
          'https://news.artnet.com/app/news-upload/2021/11/FGHMFCBDIVHB3N6PSB7GNB53NM.png',
      },
      {
        id: uuidv4(),
        contractAddress: SMART_CONTRACTS.CONTRACT_ONE,
        ownerAddress: ACCOUNTS.ALICE,
        tokenId:
          'https://cryptoslate.com/wp-content/themes/cryptoslate-2020/imgresize/timthumb.php?src=https://cryptoslate.com/wp-content/uploads/2022/02/cryptopunk-ethereum.jpg&w=600&h=315&q=75',
      },
      {
        id: uuidv4(),
        contractAddress: SMART_CONTRACTS.CONTRACT_ONE,
        ownerAddress: ACCOUNTS.ALICE,
        tokenId: '3',
      },
      {
        id: uuidv4(),
        contractAddress: SMART_CONTRACTS.CONTRACT_ONE,
        ownerAddress: ACCOUNTS.BOB,
        tokenId: '4',
      },
      {
        id: uuidv4(),
        contractAddress: SMART_CONTRACTS.CONTRACT_ONE,
        ownerAddress: ACCOUNTS.BOB,
        tokenId: '5',
      },
      {
        id: uuidv4(),
        contractAddress: SMART_CONTRACTS.CONTRACT_TWO,
        ownerAddress: ACCOUNTS.ALICE,
        tokenId: '6',
      },
      {
        id: uuidv4(),
        contractAddress: SMART_CONTRACTS.CONTRACT_TWO,
        ownerAddress: ACCOUNTS.BOB,
        tokenId: '7',
      },
      {
        id: uuidv4(),
        contractAddress: SMART_CONTRACTS.CONTRACT_TWO,
        ownerAddress: ACCOUNTS.BOB,
        tokenId: '8',
      },
    ],
  });
}

//TODO: add top level awaits

seed()
  .then(() => {
    console.log('seed completed');
  })
  .catch((e) => {
    console.error(e);
  });
