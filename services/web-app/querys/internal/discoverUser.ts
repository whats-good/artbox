import { gql } from "../../.utils/internalTypes";

export const discoverUser = gql(`
  query discoverUser {
    discoverUsers {
      ... on QueryDiscoverUsersSuccess {
        __typename
        data {
          username
        }
      }
    }
  }
`);
