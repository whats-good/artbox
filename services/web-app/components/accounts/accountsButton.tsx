import { ButtonInner, ButtonOuter } from "../button";
import type { AccountsButtonProps } from "./types";

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
