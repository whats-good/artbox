import { gql } from "../../.utils/internalTypes";

export const editUser = gql(`
  mutation EditUser($username: String!, $description: String) {
    editUser(input: {username: $username, description: $description}) {
      username
    }
  }
`);
