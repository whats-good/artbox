import { Modal } from "../../modal";
import { Dispatch, SetStateAction } from "react";
import { InsideSignUpModal } from "./insideSignUpModal";

//Types

type SignUpModalProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
}

export const SignUpModal = ({ toggleShowModal } : SignUpModalProps) => {
  return (
    <>
      <Modal
        toggleShowModal={toggleShowModal}
        title="Create Profile"
        height="510px"
        width="450px"
        defaultPosition={{
          x: 40,
          y: 40,
        }}
      >
        <InsideSignUpModal toggleShowModal={toggleShowModal}/>
      </Modal>
    </>
  )
}
