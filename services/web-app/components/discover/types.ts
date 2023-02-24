import { Dispatch, SetStateAction } from "react";

export type DiscoverButtonProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
};
