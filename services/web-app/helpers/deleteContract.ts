import apolloClient from "../utils/apollo-client";
import { deleteContractMutation } from "../querys/internal";

type DeleteContractInput = {
  contractAddress: string;
  userAddress: string;
};
type DeleteContractSuccess = {
  success: true;
  deletedAddress: string;
};
type DeleteContractFailed = {
  success: false;
  message: string;
};
type DeleteContractOutput = DeleteContractSuccess | DeleteContractFailed;

export const deleteContract = async ({
  contractAddress,
  userAddress,
}: DeleteContractInput): Promise<DeleteContractOutput> => {
  try {
    const deletedContract = await apolloClient.mutate({
      mutation: deleteContractMutation,
      variables: {
        deleteContractArgs: {
          contractAddress: contractAddress,
          userAddress: userAddress,
        },
      },
    });
    if (deletedContract.data?.deleteContract.contractAddress) {
      return {
        success: true,
        deletedAddress: deletedContract.data.deleteContract.contractAddress,
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
