import { Dispatch, SetStateAction } from "react";
import { ButtonInner, ButtonOuter } from "../button";

type AccountsButtonProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
  showModal: boolean;
};

export const AccountsButton = ({
  toggleShowModal,
  showModal,
}: AccountsButtonProps) => {
  return (
    <ButtonOuter>
      <ButtonInner onClick={() => toggleShowModal(!showModal)}>
        My Accounts
      </ButtonInner>
    </ButtonOuter>
  );
};
