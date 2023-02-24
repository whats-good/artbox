import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";
import { ButtonInner, ButtonOuter } from "../button";
import { ConnectWalletWrapper } from "./styles";
import { ConnectedAccount } from "./addressDisplay";

export const ConnectWallet = () => {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const disconnect = useDisconnect({
    onError(e) {},
    onSuccess() {
      setConnectedAddress(null);
    },
  });

  const { address, isConnecting, isConnected } = useAccount();

  useEffect(() => {
    if (typeof address === "string") {
      setConnectedAddress(address);
    }
  }, [address]);

  return (
    <ConnectWalletWrapper>
      {connectedAddress && (
        <ConnectedAccount navbar={true} connectedAddress={connectedAddress} />
      )}
      {connectors.map((connector) => (
        <ButtonOuter key={connector.id}>
          <ButtonInner
            onClick={() => {
              if (connectedAddress) {
                disconnect.disconnect();
              } else {
                connect({ connector });
              }
            }}
          >
            {connectedAddress ? "Disconnect" : "Connect"}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              " (connecting)"}
          </ButtonInner>
        </ButtonOuter>
      ))}
      {error && <div>{error.message}</div>}
    </ConnectWalletWrapper>
  );
};
