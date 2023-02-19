import apolloClient from "../utils/apollo-client";
import { userInfoWithAddress } from "../querys/internal";

type PopulateSignUpFormArgs = {
  address: string;
};
type PopulateSignUpFormArgsSuccess = {
  userExists: true;
  username: string;
  address: string;
  description: string;
  contracts: string[];
};
type PopulateSignUpFormArgsFailed = {
  userExists: false;
};
type PopulateSignUpFormArgsOutput =
  | PopulateSignUpFormArgsSuccess
  | PopulateSignUpFormArgsFailed;

export const populateSignUpForm = async ({
  address,
}: PopulateSignUpFormArgs): Promise<PopulateSignUpFormArgsOutput> => {
  try {
    const data = await apolloClient.query({
      query: userInfoWithAddress,
      variables: {
        address: address,
      },
    });

    //Checks if Query was successful and there is an account
    if (
      data.data.user.__typename === "QueryUserSuccess" &&
      data.data.user.data.username
    ) {
      return {
        userExists: true,
        username: data.data.user.data.username,
        address: data.data.user.data.address,
        description: data.data.user.data.description
          ? data.data.user.data.description
          : "",
        contracts: data.data.user.data.contracts.map(
          (contract) => contract.contractAddress
        ),
      };
    }
    return {
      userExists: false,
    };
  } catch (e) {
    return {
      userExists: false,
    };
  }
};
