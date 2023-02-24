import { signInWithEthereum } from "../../siwe";
import { ButtonInner, ButtonOuter } from "../button";
import { ConnectedAccount } from "../connectwallet";
import type { ModalSignMessageProps } from "./types";
import { ModalSignMessageWrapper } from "./styles";

export const ModalSignMessage = ({
  address,
  signer,
  loggedInFunction,
}: ModalSignMessageProps) => {
  return (
    <ModalSignMessageWrapper>
      <ConnectedAccount connectedAddress={address} />
      <ButtonOuter>
        <ButtonInner
          onClick={async () => {
            const signedIn = await signInWithEthereum(
              address,
              signer,
              window.location.host,
              window.location.origin
            );
            if (signedIn.ok) {
              loggedInFunction(true);
            }
          }}
        >
          Please sign a message
        </ButtonInner>
      </ButtonOuter>
    </ModalSignMessageWrapper>
  );
};
