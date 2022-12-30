import { gql } from '../.utils/gql/types'

export const collectionInfo = gql(`
  query CollectionInfo(
    $tokenAddress: TokensQueryInput,
    $collectionAddress: CollectionsQueryInput,
    $aggregateStatAddress: CollectionAddressOwnerAddressAttributesInput!,
    $ownerCountAddress: CollectionAddressAndAttributesInput!) {
    tokens(
      where: $tokenAddress
      pagination: {limit: 9}
      networks: {network: ETHEREUM, chain: MAINNET}
      sort: {sortKey: TOKEN_ID, sortDirection: DESC}
    ) {
      nodes {
        token {
          collectionName
          collectionAddress
          description
          image {
            url
            mediaEncoding {
              ... on ImageEncodingTypes {
                thumbnail
              }
            }
          }
          metadata
          tokenContract {
            description
            name
            symbol
            totalSupply
            collectionAddress
          }
          tokenId
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
    collections(
      networks: [{network: ETHEREUM, chain: MAINNET}]
      sort: {sortKey: CREATED, sortDirection: ASC}
      where: $collectionAddress
    ) {
      nodes {
        address
        name
        symbol
        totalSupply
        description
        tokenStandard
      }
    }
    aggregateStat {
      salesVolume(where: $aggregateStatAddress) {
        usdcPrice
      }
      ownerCount(
        where: $ownerCountAddress
        networks: {network: ETHEREUM, chain: MAINNET}
      )
    }
  }
`)