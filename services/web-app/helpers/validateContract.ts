import type { Provider } from "@wagmi/core";
import { ethers } from "ethers";
import { erc721ABI } from "wagmi";

type Valid = {
  contract: string;
  valid: true;
};
type inValid = {
  valid: false;
};

type isValid = Valid | inValid;

export const validateContract = (
  address: string,
  provider: Provider
): isValid => {
  let output;

  //Check if address is valid (in any supported format).
  if (!ethers.utils.isAddress(address)) {
    return {
      valid: false,
    };
  }

  //Try to instantiate contract class with ERC721 ABI, if that works, we're good.
  try {
    const contract = new ethers.Contract(address, erc721ABI, provider);

    //Check unique method's existence to confirm it is erc721 and not erc20, etc.
    if (contract.functions.ownerOf !== undefined) {
      output = {
        valid: true,
        contract: contract.address,
      };
      return output;
    }

    return {
      valid: false,
    };
  } catch (e) {
    return {
      valid: false,
    };
  }
};
