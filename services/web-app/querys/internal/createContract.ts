import { gql } from "../../.utils/internalTypes";

export const createContract = gql(`
  mutation CreateContract($ContractInfo : ContractInput!) {
    createContract(input: $ContractInfo) {
      contractAddress
    }
  }
`);
