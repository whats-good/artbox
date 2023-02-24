import { SignUpButtonProps } from "./types";
import { ButtonInner, ButtonOuter } from "../button";

export const SignUpButton = ({
  toggleShowModal,
  showModal,
}: SignUpButtonProps) => {
  return (
    <ButtonOuter>
      <ButtonInner onClick={() => toggleShowModal(!showModal)}>
        Create
      </ButtonInner>
    </ButtonOuter>
  );
};
