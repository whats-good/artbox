import { signInWithEthereum } from "../../siwe";
import { ButtonInner } from "../button";
import { ConnectedAccount } from "../connectwallet";
import type { ModalSignMessageProps } from "./types";
import { PleaseSignMessageButton, ModalSignMessageWrapper } from "./styles";

export const ModalSignMessage = ({
  address,
  signer,
  loggedInFunction,
}: ModalSignMessageProps) => {
  return (
    <ModalSignMessageWrapper>
      <ConnectedAccount connectedAddress={address} />
      <PleaseSignMessageButton>
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
          Please sign a message to create or edit your account.
        </ButtonInner>
      </PleaseSignMessageButton>
    </ModalSignMessageWrapper>
  );
};
