import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { ConnectedAccountWrapper } from "./styles";
import { shortenAddress } from "../../helpers/shortenAddress";

export const ConnectedAccount = () => {
  const [connectedAddress, setConnectedAddress] = useState<string>("");

  const { address, isConnecting, isConnected } = useAccount();

  useEffect(() => {
    if (typeof address === "string") {
      setConnectedAddress(address);
    }
  }, [address]);

  return connectedAddress ? (
    <ConnectedAccountWrapper>
      <p>Connected: {shortenAddress(connectedAddress)}</p>
    </ConnectedAccountWrapper>
  ) : (
    <ConnectedAccountWrapper></ConnectedAccountWrapper>
  );
};
