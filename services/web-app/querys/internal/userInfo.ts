import { gql } from "../../.utils/internalTypes";

export const userInfo = gql(`
  query userInfo {
    user(username: "Oxlogan") {
      ... on QueryUserSuccess {
        __typename
        data {
          address
          description
          username
          contracts {
            contractAddress
          }
        }
      }
    }
  }
`);
