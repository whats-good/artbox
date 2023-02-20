import { gql } from "../../.utils/internalTypes";

export const editUser = gql(`
  mutation EditUser($username: String!) {
    editUser(input: {username: $username}) {
      username
    }
  }
`);
