import { gql } from "../../.utils/internalTypes";

export const createContract = gql(`
  mutation CreateContract($address: String!, $username: String!) {
    createContract(input: {contractAddress: $address, username: $username}) {
      contractAddress
    }
  }
`);
