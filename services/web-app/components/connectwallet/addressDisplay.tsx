import { shortenAddress } from "../../helpers/shortenAddress";
import type { ConnectedAccountProps } from "./types";
import {
  ConnectedAccountWrapper,
  NavBarConnectedAccountWrapper,
} from "./styles";

export const ConnectedAccount = ({
  connectedAddress,
  navbar,
}: ConnectedAccountProps) => {
  if (navbar) {
    return (
      <NavBarConnectedAccountWrapper>
        {connectedAddress && (
          <p>Connected: {shortenAddress(connectedAddress)}</p>
        )}
      </NavBarConnectedAccountWrapper>
    );
  } else {
    return (
      <ConnectedAccountWrapper>
        {connectedAddress && (
          <p>Connected: {shortenAddress(connectedAddress)}</p>
        )}
      </ConnectedAccountWrapper>
    );
  }
};
