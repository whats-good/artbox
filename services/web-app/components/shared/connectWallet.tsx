import styled from "styled-components";
import { ConnectWallet } from "../connectwallet";

const ConnectWalletMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ModalConnectWallet = () => {
  return (
    <ConnectWalletMessageWrapper>
      <p>Please connect your wallet</p>
      <ConnectWallet />
    </ConnectWalletMessageWrapper>
  );
};
