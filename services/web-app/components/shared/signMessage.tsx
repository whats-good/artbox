import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { signInWithEthereum } from "../../siwe";
import { ButtonInner, ButtonOuter } from "../button";

type ModalSignMessageProps = {
  address: string;
  signer: any;
  loggedInFunction: Dispatch<SetStateAction<boolean>>;
};

const PleaseSignMessageButton = styled(ButtonOuter)`
  width: 90%;
`;

export const ModalSignMessage = ({
  address,
  signer,
  loggedInFunction,
}: ModalSignMessageProps) => {
  return (
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
  );
};
