import { gql } from "../../.utils/zoraTypes";

export const validateContract = gql(`
  query ValidateContract($contractAddress: CollectionsQueryInput) {
    collections(where: $contractAddress) {
      nodes {
        totalSupply
      }
    }
  }
`);
