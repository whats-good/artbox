import { gql } from '../.utils/gql/types';

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