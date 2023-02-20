import { gql } from "../../.utils/internalTypes";

export const userInfo = gql(`
  query userInfo($name: String!) {
    user(username: $name) {
      ... on QueryUserSuccess {
        __typename
        data {
          address
          contracts {
            contractAddress
          }
          description
          username
          id
        }
      }
    }
  }
`);
