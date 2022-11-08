import { shortenAddress, useEthers } from "@usedapp/core";
import { ShortenedAddressWrapper } from "./styled/shortenedaddresswrapper";

export function ShortenedAddress() {
  const { account } = useEthers();

  return (
    <ShortenedAddressWrapper>
      {account ? <p>Connected: {shortenAddress(account)}</p> : <></>}
    </ShortenedAddressWrapper>
  );
}
