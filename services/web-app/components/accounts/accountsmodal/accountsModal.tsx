import styled from "styled-components";
import { useAccount } from "wagmi";
import { Dispatch, SetStateAction } from "react";
import { Modal } from "../../modal";
import { ConnectedAccount } from "../../connectwallet";
import { ModalConnectWallet } from "../../shared/connectWallet";
import { AccountsView } from "./accountsView";

//Types
type AccountsModalProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
};

//Styles
const InnerAccountsModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const AccountsModal = ({ toggleShowModal }: AccountsModalProps) => {
  return (
    <Modal
      toggleShowModal={toggleShowModal}
      title="My Accounts"
      height="510px"
      width="450px"
      defaultPosition={{
        x: 40,
        y: 40,
      }}
    >
      <InnerAccountsModal toggleShowModal={toggleShowModal} />
    </Modal>
  );
};

type InnerAccountsModalProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
};

const InnerAccountsModal = ({ toggleShowModal }: InnerAccountsModalProps) => {
  const { address } = useAccount();

  return (
    <InnerAccountsModalWrapper>
      {address ? (
        <>
          <ConnectedAccount />
          <AccountsView toggleShowModal={toggleShowModal} address={address} />
        </>
      ) : (
        <ModalConnectWallet />
      )}
    </InnerAccountsModalWrapper>
  );
};
