import { Dispatch, SetStateAction } from "react";

export type ModalSignMessageProps = {
  address: string;
  signer: any;
  loggedInFunction: Dispatch<SetStateAction<boolean>>;
};
