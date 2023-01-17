import { Dispatch, SetStateAction } from "react"
import { ButtonInner, ButtonOuter } from "../button"

type SignUpButtonProps = {
  toggleShowModal: Dispatch<SetStateAction<Boolean>>;
  showModal: Boolean;
}

export const SignUpButton = ({ toggleShowModal, showModal } : SignUpButtonProps) => {

  return (
    <>
      <ButtonOuter>
        <ButtonInner onClick={() => toggleShowModal(!showModal)}>Create</ButtonInner>
      </ButtonOuter>
    </>
  )
}