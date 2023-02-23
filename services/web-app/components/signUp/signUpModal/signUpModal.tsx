import { Modal } from "../../modal";
import type { SignUpModalProps } from "./types";
import { InsideSignUpModal } from "./insideSignUpModal";

export const SignUpModal = ({ toggleShowModal }: SignUpModalProps) => {
  return (
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
      <InsideSignUpModal toggleShowModal={toggleShowModal} />
    </Modal>
  );
};
