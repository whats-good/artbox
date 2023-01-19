import { gql } from "@apollo/client";

export const tokenInfo = gql`
  query tokenInfo($token: TokenInput!) {
    token(token: $token) {
      token {
        collectionAddress
        collectionName
        description
        owner
        name
        attributes {
          displayType
          traitType
          value
        }
        image {
          mediaEncoding {
            ... on ImageEncodingTypes {
              large
              poster
            }
            ... on UnsupportedEncodingTypes {
              __typename
              original
            }
          }
          url
        }
        tokenStandard
      }
      events(sort: { sortKey: CREATED, sortDirection: DESC }) {
        eventType
        transactionInfo {
          transactionHash
          blockTimestamp
        }
        properties {
          ... on Sale {
            saleContractAddress
            buyerAddress
            price {
              usdcPrice {
                decimal
              }
            }
            saleType
            sellerAddress
            networkInfo {
              chain
            }
          }
          ... on TransferEvent {
            __typename
            fromAddress
            toAddress
          }
          ... on MintEvent {
            __typename
            price {
              usdcPrice {
                decimal
              }
            }
            toAddress
          }
        }
      }
    }
  }
`;
