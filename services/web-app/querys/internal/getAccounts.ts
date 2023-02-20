import { gql } from "../../.utils/internalTypes";

export const GetAccounts = gql(`
  query GetAccounts($address: String!) {
    getAccounts(address: $address) {
      ... on QueryGetAccountsSuccess {
        __typename
        data {
          username
          contracts {
            contractAddress
          }
        }
      }
    }
  }
`);
