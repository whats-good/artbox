import { useAccount } from "wagmi";
import { Modal } from "../../modal";
import { ConnectedAccount } from "../../connectwallet";
import { ModalConnectWallet } from "../../shared/connectWallet";
import { AccountsView } from "./accounts";
import { AccountsModalProps } from "./types";
import { InnerAccountsModalWrapper } from "./styles";

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
      <InnerAccountsModal />
    </Modal>
  );
};

const InnerAccountsModal = () => {
  const { address } = useAccount();
  return (
    <InnerAccountsModalWrapper>
      {address ? (
        <>
          <ConnectedAccount connectedAddress={address} />
          <AccountsView address={address} />
        </>
      ) : (
        <ModalConnectWallet />
      )}
    </InnerAccountsModalWrapper>
  );
};
