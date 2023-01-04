import { gql } from "@apollo/client"

export const validateContract = gql`
  query ValidateContract($contractAddress: CollectionsQueryInput) {
  collections(where: $contractAddress) {
    nodes {
      totalSupply
    }
  }
}
`


