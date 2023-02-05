import { useAccount } from "wagmi"
import { useEffect, useState } from "react";
import styled from "styled-components";
import { shortenAddress } from "../../helpers/shortenAddress";

const ConnectedAccountWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 10px;
`

export const ConnectedAccount = () => {

  const [connectedAddress, setConnectedAddress] = useState<string>('')

  const { address, isConnecting, isConnected } = useAccount()

  useEffect(() => {
    if (typeof address === "string") {
      setConnectedAddress(address)
    }
  }, [address])

  if (connectedAddress) {
    return (
      <ConnectedAccountWrapper>
        <p>Connected: {shortenAddress(connectedAddress)}</p>
      </ConnectedAccountWrapper>
    )
  };
  return (
    <ConnectedAccountWrapper>
      <p>Not Connected</p>
    </ConnectedAccountWrapper>
  )
}