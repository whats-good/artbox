import { gql } from "../../.utils/zoraTypes";

export const tokenGallery = gql(`
  query tokenGallery($tokenAddress: TokensQueryInput, $page: PaginationInput) {
    tokens(
      where: $tokenAddress
      pagination: $page
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
              ... on UnsupportedEncodingTypes {
                __typename
                original
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
  }
`);
