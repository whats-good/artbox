import { createUser, createContract } from "../querys/internal";
import apolloClient from "../utils/apollo-client";

type CreateUserInput = {
  address: string;
  bio: string;
  username: string;
  contracts?: string[];
};

type CreateUserOutput = {
  success: boolean;
  message: string;
};

export const createOrUpdateUser = async ({
  address,
  bio,
  username,
  contracts,
}: CreateUserInput): Promise<CreateUserOutput> => {
  let editedAccount;
  let linkedContracts;

  //Update or create User information
  try {
    editedAccount = await apolloClient.mutate({
      mutation: createUser,
      variables: {
        newUserDetails: {
          address: address,
          username: username,
          description: bio,
        },
      },
    });

    if (editedAccount.errors) {
      return {
        success: false,
        message: `There was an error creating user. Error => ${editedAccount.errors}`,
      };
    }
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: `There was an error creating user. Error => ${JSON.stringify(
        e
      )}`,
    };
  }

  //Then create / link contracts if they are added in form
  if (contracts?.length) {
    try {
      for (let i = 0; i < contracts.length; i++) {
        linkedContracts = await apolloClient.mutate({
          mutation: createContract,
          variables: {
            ContractInfo: {
              contractAddress: contracts[i],
              userAddress: address,
            },
          },
        });
        if (linkedContracts.errors) {
          return {
            success: false,
            message: `There was an error linking or creating contracts with ${contracts[i]}. Error => ${linkedContracts.errors}`,
          };
        }
      }
    } catch (e) {
      console.log(e);
      return {
        success: false,
        message: `There was an error linking or creating contracts. Error => ${JSON.stringify(
          e
        )}`,
      };
    }
  }

  //Return Success
  return {
    success: true,
    message: "Updated everything",
  };
};
