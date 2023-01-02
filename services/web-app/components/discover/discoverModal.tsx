import { Modal } from "../../components/modal";
import { Dispatch, SetStateAction } from "react";

type DiscoverModalProps = {
  toggleShowModal: Dispatch<SetStateAction<Boolean>>;
}

export const DiscoverModal = ({ toggleShowModal } : DiscoverModalProps) => {
  return (
    <>
      <Modal
        toggleShowModal={toggleShowModal}
        title="Discover"
        height="300px"
        width="400px"
        defaultPosition={{
          x: 40,
          y: 40,
        }}
      >
        <div>Discover Modal Here!</div>
      </Modal>
    </>
  )
}