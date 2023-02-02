import { Dispatch, SetStateAction } from "react";
import { useAccount } from "wagmi";
import styled from "styled-components";
import { ConnectWallet } from "../../connectwallet";
import { shortenAddress } from "../../../helpers/shortenAddress";
import { CreateProfile } from "./createProfile";

//Types

type ConnectedAddressProps = {
  address: string;
}
type InsideSignUpModalProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
}

//Styles

const ConnectWalletMessageWrapper = styled.div`
`;
const InsideSignUpModalWrapper = styled.div`
  height: 500px;
  width: 450px;
`;

export const InsideSignUpModal = ({ toggleShowModal }: InsideSignUpModalProps) => {

  const { address } = useAccount();

  if (!address) return <ConnectWalletMessage />

  return (
    <InsideSignUpModalWrapper>
      {address ?
        <>
          <ConnectedAddress address={address}/>
          <CreateProfile address={address} toggleShowModal={toggleShowModal}/>
        </>
      : <ConnectWalletMessage />}
    </InsideSignUpModalWrapper>
  )
}

const ConnectWalletMessage = () => {
  return (
    <ConnectWalletMessageWrapper>
      <h1>Please connect your wallet to create an account</h1>
      <ConnectWallet/>
    </ConnectWalletMessageWrapper>
  )
}

const ConnectedAddress = ({ address } : ConnectedAddressProps) => {
  return (
    <>
      <p>Connected at {shortenAddress(address)}</p>
    </>
  )
}