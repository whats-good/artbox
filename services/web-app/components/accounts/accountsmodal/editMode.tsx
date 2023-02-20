import { useState } from "react";
import styled from "styled-components";
import { useSigner } from "wagmi";
import { ModalSignMessage } from "../../shared/signMessage";

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
        <ModalSignMessage
          address={address}
          signer={signer}
          loggedInFunction={setSignedIn}
        />
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
