import { gql } from "../../.utils/internalTypes";

export const createUser = gql(`
  mutation CreateUser($user: UserInput!) {
    createUser(input: $user) {
      address
    }
  }
`);
