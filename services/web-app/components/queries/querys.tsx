import { gql } from "@apollo/client";

export const CollectionQuery = gql`
  query CollectionInfo {
    collections(
      networks: [{network: ETHEREUM, chain: MAINNET}]
      pagination: {limit: 9}
      sort: {sortKey: CREATED, sortDirection: ASC}
      where: {collectionAddresses: "0x7D70D50A8E9D1B4F04F5a2fA2e46078DA9EBB467"}
    ) {
      nodes {
        address
        name
        symbol
        totalSupply
        description
      }
    }
    tokens(
      where: {collectionAddresses: "0x7D70D50A8E9D1B4F04F5a2fA2e46078DA9EBB467"}
      pagination: {limit: 9}
      networks: {network: ETHEREUM, chain: MAINNET}
      sort: {sortKey: TOKEN_ID, sortDirection: DESC}
    ) {
      nodes {
        token {
          metadata
        }
      }
    }
  }
`