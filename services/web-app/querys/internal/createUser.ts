import { gql } from "../../.utils/internalTypes";

export const createUser = gql(`
  mutation MakeNewUser($newUserDetails: UserInput!) {
    createUser(input: $newUserDetails) {
      id
      username
    }
  }
`);
