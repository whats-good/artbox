import { useAccount, useConnect, useDisconnect } from "wagmi";
import { disconnect } from "@wagmi/core";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ButtonOuter, ButtonInner } from "../button/buttonstyled";
import { ConnectedAccount } from "./addressDisplay";

const ConnectWalletWrapper = styled.div`
  grid-column-start: 3;
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const ConnectWallet = () => {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const disconnect = useDisconnect({
    onError(e) {
      console.log("ERROR: ", e);
    },
    onSuccess(data) {
      console.log("SUCCESS: ", data);
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
      <ConnectedAccount />
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
