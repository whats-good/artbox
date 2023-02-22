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
  //Update or create User information
  try {
    const newUser = await apolloClient.mutate({
      mutation: createUser,
      variables: {
        user: {
          address: address,
          username: username,
          description: bio,
          smartContracts: contracts,
        },
      },
    });
    if (newUser.errors) {
      return {
        success: false,
        message: `There was an error creating user. Error => ${newUser.errors}`,
      };
    }
  } catch (e) {
    return {
      success: false,
      message: `There was an error creating user. Error => ${JSON.stringify(
        e
      )}`,
    };
  }

  //Return Success
  return {
    success: true,
    message: "Updated everything",
  };
};
