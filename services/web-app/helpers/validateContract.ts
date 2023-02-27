import type { Provider } from "@wagmi/core";
import { ethers } from "ethers";
import { erc721ABI } from "wagmi";
import client from "../utils/apollo-client";
import { collectionInfo } from "../querys/zora";

type Valid = {
  contract: string;
  valid: true;
};
type inValid = {
  valid: false;
};

type isValid = Valid | inValid;

export const validateContract = async (
  address: string,
  provider: Provider
): Promise<isValid> => {
  let output;

  //Check if address is valid (in any supported format).
  if (!ethers.utils.isAddress(address)) {
    return {
      valid: false,
    };
  }

  try {
    const { data } = await client.query({
      variables: {
        tokenAddress: { collectionAddresses: [address] },
        collectionAddress: {
          collectionAddresses: [address],
        },
        aggregateStatAddress: {
          collectionAddresses: [address],
        },
        ownerCountAddress: {
          collectionAddresses: [address],
        },
      },
      context: { clientName: "zora" },
      query: collectionInfo,
    });

    if (!data.tokens.nodes.length || !data.tokens.nodes[0].token.image) {
      return {
        valid: false,
      };
    } else {
      return {
        valid: true,
        contract: address,
      };
    }
  } catch (e) {
    return {
      valid: false,
    };
  }

  //Try to instantiate contract class with ERC721 ABI, if that works, we're good.
  // try {
  //   const contract = new ethers.Contract(address, erc721ABI, provider);

  //Check unique method's existence to confirm it is erc721 and not erc20, etc.
  //   if (contract.functions.ownerOf !== undefined) {
  //     output = {
  //       valid: true,
  //       contract: contract.address,
  //     };
  //     return output;
  //   }

  //   return {
  //     valid: false,
  //   };
  // } catch (e) {
  //   return {
  //     valid: false,
  //   };
  // }
};
