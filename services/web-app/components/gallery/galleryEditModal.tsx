import { Dispatch, SetStateAction } from "react";
import { EditAccount } from "../accounts/accountsmodal/editmode/editMode";
import { Modal } from "../modal";
import type { UserData } from "../accounts/accountsmodal/accounts";

type EditAccountModalProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
  data: UserData;
};

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
      <EditAccount data={data} />
    </Modal>
  );
};
