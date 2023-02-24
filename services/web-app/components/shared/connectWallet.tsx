import { ConnectWallet } from "../connectwallet";
import { ConnectWalletMessageWrapper } from "./styles";

export const ModalConnectWallet = () => {
  return (
    <ConnectWalletMessageWrapper>
      <p>Please connect your wallet</p>
      <ConnectWallet />
    </ConnectWalletMessageWrapper>
  );
};
