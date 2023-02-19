import { useAccount, useConnect } from "wagmi";
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
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <ConnectWalletWrapper>
      <ConnectedAccount />
      {connectors.map((connector) => (
        <ButtonOuter key={connector.id}>
          <ButtonInner
            onClick={() => {
              connect({ connector });
            }}
          >
            Connect
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
