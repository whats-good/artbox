import { Agent } from '@zoralabs/nft-metadata';
import type { NftMetadata } from '@zoralabs/nft-metadata';

const parser = new Agent({
  network: 'homestead',
  networkUrl: 'https://eth-rpc.gateway.pokt.network',
  timeout: 60 * 1000,
})

export const getNftMetaData = async (address: string, id: string) :  Promise<NftMetadata> => {
  return await parser.fetchMetadata(address, id);
}

export type BulkNftMetaData = {
  page: number,
  results: NftMetadata[]
}

export const getBulkNftMetaData = async (address: string, page: number = 1) : Promise<BulkNftMetaData> => {

  // This initializes the count correctly depending on the page. Each page is 15 tokens
  let count = ( page * 15 ) - 14;

  //Create Return Array
  let output = [];

  //Create Array with length of 15 to map over
  const arr = Array(15).fill('0');

  //Fetch 15 token's metadata
  try {
    for (let i = 0; i < arr.length; i++) {
      let metaData = await parser.fetchMetadata(address, count.toString());
      output.push(metaData);
      count ++;
    }
  } catch(err) {
    console.log(err);
  }
  return {
    page: page + 1,
    results: output,
  }
};