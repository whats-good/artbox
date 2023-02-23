import { Dispatch, SetStateAction } from "react";

export type SignUpButtonProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
};
