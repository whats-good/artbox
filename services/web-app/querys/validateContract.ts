import { gql } from '../.utils/gql/types';

export const validateContract = gql(`
  query ValidateContract($contractAddress: CollectionsQueryInput) {
    collections(where: $contractAddress) {
      nodes {
        totalSupply
      }
    }
  }
`);


