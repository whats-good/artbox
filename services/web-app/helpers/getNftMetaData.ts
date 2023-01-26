import { Agent } from "@zoralabs/nft-metadata";
import type { NftMetadata } from "@zoralabs/nft-metadata";

const parser = new Agent({
  network: "homestead",
  networkUrl: "https://eth-rpc.gateway.pokt.network",
  timeout: 60 * 1000,
});

export type GetNftMetaDataError = {
  __typename: "GetNftMetaDataError";
  message: string;
};

export type BulkNftMetaData = {
  __typename: "BulkNftMetaData";
  page: number;
  results: NftMetadata[];
};

type BulkNftMetaDataError = {
  __typename: "BulkNftMetaDataError";
  message: string;
};

//Gets individual NFTs metadata
export const getNftMetaData = async (
  address: string,
  id: string
): Promise<NftMetadata | GetNftMetaDataError> => {
  try {
    return await parser.fetchMetadata(address, id);
  } catch (e) {
    return {
      __typename: "GetNftMetaDataError",
      message: JSON.stringify(e),
    };
  }
};

//Gets bulk NFTs metadata
export const getBulkNftMetaData = async (
  address: string,
  page = 1
): Promise<BulkNftMetaData | BulkNftMetaDataError> => {
  // This initializes the count correctly depending on the page. Each page is 15 tokens
  let count = page * 15 - 14;

  //Create Return Array
  const output = [];

  //Create Array with length of 15 to map over
  const arr = Array(15).fill("0");

  //Fetch 15 token's metadata
  try {
    for (let i = 0; i < arr.length; i++) {
      const metaData = await parser.fetchMetadata(address, count.toString());
      output.push(metaData);
      count++;
    }
  } catch (e) {
    return {
      __typename: "BulkNftMetaDataError",
      message: JSON.stringify(e),
    };
  }

  return {
    __typename: "BulkNftMetaData",
    page: page + 1,
    results: output,
  };
};
