import { Dispatch, SetStateAction } from "react";
import { useAccount } from "wagmi";
import styled from "styled-components";
import { shortenAddress } from "../../../helpers/shortenAddress";
import { CreateProfile } from "./createProfile";
import { ModalConnectWallet } from "../../shared/connectWallet";

//Types
type ConnectedAddressProps = {
  address: string;
};
type InsideSignUpModalProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
};

//Styles
const InsideSignUpModalWrapper = styled.div`
  height: 500px;
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const InsideSignUpModal = ({
  toggleShowModal,
}: InsideSignUpModalProps) => {
  const { address } = useAccount();

  return (
    <InsideSignUpModalWrapper>
      {address ? (
        <>
          <ConnectedAddress address={address} />
          <CreateProfile address={address} toggleShowModal={toggleShowModal} />
        </>
      ) : (
        <ModalConnectWallet />
      )}
    </InsideSignUpModalWrapper>
  );
};

const ConnectedAddress = ({ address }: ConnectedAddressProps) => {
  return (
    <>
      <p>Connected at {shortenAddress(address)}</p>
    </>
  );
};
