import { ConnectedAccountWrapper } from "./styles";
import { shortenAddress } from "../../helpers/shortenAddress";
import type { ConnectedAccountProps } from "./types";

export const ConnectedAccount = ({
  connectedAddress,
}: ConnectedAccountProps) => {
  return (
    <ConnectedAccountWrapper>
      {connectedAddress && <p>Connected: {shortenAddress(connectedAddress)}</p>}
    </ConnectedAccountWrapper>
  );
};
