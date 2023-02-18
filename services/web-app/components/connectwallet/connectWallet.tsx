import { useAccount, useConnect } from "wagmi";
import styled from "styled-components";
import { ButtonOuter, ButtonInner } from "../button/buttonstyled";
import { shortenAddress } from "../../helpers/shortenAddress";

const StyledAddressText = styled.p`
  margin-right: 10px;
`;
const ConnectWalletWrapper = styled.div`
  grid-column-start: 3;
  display: flex;
  justify-content: end;
  align-items: center;
`;

export const ConnectWallet = () => {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { address } = useAccount();

  return (
    <ConnectWalletWrapper>
      {address && <StyledAddressText>Connected: {shortenAddress(address)}</StyledAddressText>}
      {connectors.map((connector) => (
        <ButtonOuter key={connector.id}>
          <ButtonInner
            onClick={() => connect({ connector })}
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
}
