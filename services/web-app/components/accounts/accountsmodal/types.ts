import { Dispatch, SetStateAction } from "react";

export type AccountProps = {
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setUserToEdit: Dispatch<SetStateAction<UserData | undefined>>;
  data: UserData;
};
export type UserData = {
  __typename?: "User";
  address: string;
  username: string;
  description?: string | null;
  contracts: Array<{ __typename?: "SmartContract"; contractAddress: string }>;
};
export type AccountsViewProps = {
  address: string;
};
export type AccountsModalProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
};
