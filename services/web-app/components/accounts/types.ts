import { Dispatch, SetStateAction } from "react";

export type AccountsButtonProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
};
