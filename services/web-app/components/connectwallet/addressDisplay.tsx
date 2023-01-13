import { useAccount } from "wagmi"
import styled from "styled-components";
import { shortenAddress } from "../../helpers/shortenAddress";

const ConnectedAccountWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 10px;
`

export const ConnectedAccount = () => {

  const { address } = useAccount()

  if (address) {
    return (
      <ConnectedAccountWrapper>
        <p>Connected: {shortenAddress(address)}</p>
      </ConnectedAccountWrapper>
    )
  };
  return <ConnectedAccountWrapper />;
}