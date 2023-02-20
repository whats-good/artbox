import styled from "styled-components";
import { Modal } from "../../modal";
import { useAccount } from "wagmi";
import { Dispatch, SetStateAction } from "react";
import { useQuery } from "@apollo/client";

//Types
type EditAccountModalModalProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
  accountEdited?: string;
};

//Styles
const InnerAccountsModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const EditAccountModal = ({
  toggleShowModal,
  accountEdited,
}: EditAccountModalModalProps) => {
  return (
    <Modal
      toggleShowModal={toggleShowModal}
      title="Edit Account"
      height="300px"
      defaultPosition={{
        x: 40,
        y: 40,
      }}
    >
      <InnerEditAccountModal username={accountEdited} />
    </Modal>
  );
};

type InnerEditAccountModalProps = {
  username?: string;
};

const InnerEditAccountModal = ({ username }: InnerEditAccountModalProps) => {
  return <></>;
};
