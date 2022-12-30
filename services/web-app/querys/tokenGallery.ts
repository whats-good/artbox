import { gql } from '../.utils/gql/types'

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
          metadata
          tokenId
          image {
            url
            mediaEncoding {
              ... on ImageEncodingTypes {
                thumbnail
              }
            }
            size
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);