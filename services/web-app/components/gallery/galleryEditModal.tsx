import { EditAccount } from "../accounts/accountsmodal/editmode/editMode";
import { Modal } from "../modal";
import type { EditAccountModalProps } from "./types";
import { InnerModalWrapper } from "../shared/styles";

export const EditAccountModal = ({
  toggleShowModal,
  data,
}: EditAccountModalProps) => {
  return (
    <Modal
      toggleShowModal={toggleShowModal}
      title="Edit Account"
      height="510px"
      width="450px"
      defaultPosition={{
        x: 40,
        y: 40,
      }}
    >
      <InnerModalWrapper>
        <EditAccount data={data} />
      </InnerModalWrapper>
    </Modal>
  );
};
