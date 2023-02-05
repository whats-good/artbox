import { gql } from "../../.utils/internalTypes";

export const deleteContractMutation = gql(`
  mutation deleteContract($deleteContractArgs: ContractInput!) {
    deleteContract(input: $deleteContractArgs) {
      contractAddress
    }
  }
`);