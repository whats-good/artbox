import type { Provider } from "@wagmi/core";
import { ethers } from "ethers";
import { erc721ABI } from "wagmi";

type Valid = {
  message: string;
  valid: boolean;
};

export const validateContract = (
  address: string,
  provider: Provider
): Valid => {
  let output;

  //Check if address is valid (in any supported format).
  if (!ethers.utils.isAddress(address)) {
    output = {
      message: "This is not a properly formatted address",
      valid: false,
    };
    return output;
  }

  //Try to instantiate contract class with ERC721 ABI, if that works, we're good.
  try {
    const contract = new ethers.Contract(address, erc721ABI, provider);

    //Check unique method's existence to confirm it is erc721 and not erc20, etc.
    if (contract.functions.ownerOf !== undefined) {
      output = {
        valid: true,
        message: "valid",
      };
      return output;
    }

    output = {
      valid: false,
      message: "inValid",
    };

    return output;
  } catch (e) {
    output = {
      message: "Was unable to verify this is ERC-721 contract",
      valid: false,
    };
    return output;
  }
};
