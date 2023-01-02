import { Modal } from "../../components/modal";
import { useState, Dispatch, SetStateAction } from "react";

type SignUpModalProps = {
  toggleShowModal: Dispatch<SetStateAction<Boolean>>;
}

export const SignUpModal = ({ toggleShowModal } : SignUpModalProps) => {
  return (
    <>
    <Modal
      toggleShowModal={toggleShowModal}
      title="Create Profile"
      height="300px"
      width="400px"
      defaultPosition={{
        x: 40,
        y: 40,
      }}
    >
      <div>HELLO!</div>
    </Modal>
    </>
  )
}