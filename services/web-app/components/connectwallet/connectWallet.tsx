import { useConnect } from 'wagmi';
import { ConnectWalletWrapper } from "./styled/topbarstyled";
import { ButtonOuter, ButtonInner } from "../button/buttonstyled";

export const ConnectWallet = () => {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  return (
    <ConnectWalletWrapper>
      {connectors.map((connector) => (
        <ButtonOuter key={connector.id}>
          <ButtonInner
            onClick={() => connect({ connector })}
          >
            Connect
            {isLoading &&
              connector.id === pendingConnector?.id &&
              ' (connecting)'}
          </ButtonInner>
        </ButtonOuter>
      ))}
      {error && <div>{error.message}</div>}
    </ConnectWalletWrapper>
  );
}
