import { gql } from "../../.utils/internalTypes";

export const discoverUser = gql(`
  query DiscoverUsers {
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
