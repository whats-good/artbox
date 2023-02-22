import { gql } from "../../.utils/internalTypes";

export const deleteContractMutation = gql(`
  mutation DeleteContract($address: String!, $username: String!) {
    deleteContract(input: {contractAddress: $address, username: $username}) {
      contractAddress
    }
  }
`);
