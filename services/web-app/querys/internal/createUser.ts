import { gql } from "../../.utils/internalTypes";

export const createUser = gql(`
  mutation CreateUser($address: String!, $username: String!) {
    createUser(input: {address: $address, username: $username}) {
      address
    }
  }
`);
