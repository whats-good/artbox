import { useAccount } from "wagmi";
import { InsideSignUpModalWrapper } from "./styles";
import { shortenAddress } from "../../../helpers/shortenAddress";
import { CreateProfile } from "./createProfile";
import { ModalConnectWallet } from "../../shared/connectWallet";
import type { InsideSignUpModalProps, ConnectedAddressProps } from "./types";
import { InnerModalWrapper } from "../../shared/styles";
export const InsideSignUpModal = ({
  toggleShowModal,
}: InsideSignUpModalProps) => {
  const { address } = useAccount();
  return (
    <InnerModalWrapper>
      {address ? (
        <CreateProfile address={address} toggleShowModal={toggleShowModal} />
      ) : (
        <ModalConnectWallet />
      )}
    </InnerModalWrapper>
  );
};

const ConnectedAddress = ({ address }: ConnectedAddressProps) => {
  return <p>Connected at {shortenAddress(address)}</p>;
};
