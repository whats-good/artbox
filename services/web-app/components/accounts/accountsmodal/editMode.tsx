import { useState } from "react";
import styled from "styled-components";
import { useSigner } from "wagmi";
import { signInWithEthereum } from "../../../siwe";
import { ButtonInner, ButtonOuter } from "../../button";

const EditAccountWrapper = styled.div``;

type EditAccountProps = {
  username: string;
  address: string;
};

export const EditAccount = ({ username, address }: EditAccountProps) => {
  const [signedIn, setSignedIn] = useState<boolean>(false);

  const { data: signer } = useSigner();

  return (
    <EditAccountWrapper>
      {signedIn ? (
        <SignedInView username={username} />
      ) : (
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
                setSignedIn(true);
              }
            }}
          >
            Please sign a message to edit your account.
          </ButtonInner>
        </ButtonOuter>
      )}
    </EditAccountWrapper>
  );
};

type SignedInViewProps = {
  username: string;
};

const SignedInView = ({ username }: SignedInViewProps) => {
  return <>{username}</>;
};
