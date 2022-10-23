import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prismaClient = new PrismaClient();

// a random wallet address

const ACCOUNTS = {
  ALICE: '0xb0a36b3cedf210f37a5e7bc28d4b8e91d4e3c412',
  BOB: '0x6fc4792b1bbe0df6b0d80e9cc7bd61d872bf2768',
};

const SMART_CONTRACTS = {
  CONTRACT_ONE: '0xe34056ad5a4dbe825ea93cfb5b62ab5f2548c294',
  CONTRACT_TWO: '0x1372c547e54733ea35f28ef3ab00d4816a488208',
};

async function seed() {
  await prismaClient.chainAccount.createMany({
    data: [
      {
        address: ACCOUNTS.ALICE,
      },
      {
        address: ACCOUNTS.BOB,
      },
    ],
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

// TODO: add top level awaits
seed()
  .then(() => {
    console.log('seed completed');
  })
  .catch((e) => {
    console.error(e);
  });
