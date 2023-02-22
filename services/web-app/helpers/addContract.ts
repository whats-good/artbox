import type { Provider } from "@wagmi/core";
import { validateContract } from "./validateContract";
import apolloClient from "../utils/apollo-client";
import { createContract } from "../querys/internal";

type AddContractInput = {
  contractAddress: string;
  userAddress: string;
  provider: Provider;
  username: string;
};
type AddContractSuccess = {
  success: true;
  addedContract: string;
};
type AddContractFailed = {
  success: false;
  message: string;
};

type AddContractOutput = AddContractSuccess | AddContractFailed;

export const addContract = async ({
  contractAddress,
  userAddress,
  username,
  provider,
}: AddContractInput): Promise<AddContractOutput> => {
  //First check if contract is valid ERC-721
  if (!validateContract(contractAddress, provider).valid) {
    return {
      success: false,
      message: "Not Valid Contract",
    };
  }

  //Next create contract
  try {
    const linkedContracts = await apolloClient.mutate({
      mutation: createContract,
      variables: {
        address: contractAddress,
        username: username,
      },
    });

    if (linkedContracts.data?.createContract.contractAddress) {
      return {
        success: true,
        addedContract: linkedContracts.data.createContract.contractAddress,
      };
    }
    return {
      success: false,
      message: "Unknown error",
    };
  } catch (e) {
    return {
      success: false,
      message: JSON.stringify(e),
    };
  }
};
