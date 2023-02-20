import { useState } from "react";
import styled from "styled-components";
import { useSigner } from "wagmi";
import { ModalSignMessage } from "../../shared/signMessage";
import { useMutation, useQuery } from "@apollo/client";
import { AddCollections, ShowCollections } from "./addCollections";
import { editUser, userInfo } from "../../../querys/internal";

const EditAccountWrapper = styled.div``;

type EditAccountProps = {
  username: string;
  address: string;
};
type SignedInViewProps = {
  username: string;
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

const SignedInView = ({ username }: SignedInViewProps) => {
  const [mutateFunction, { data, loading, error }] = useMutation(editUser);

  return (
    <>
      {/* <AddCollections
        contracts={contracts}
        setContracts={setContracts}
        userAddress={address}
      />
      <ShowCollections
        userAddress={address}
        contracts={contracts}
        setContracts={setContracts}
      /> */}
    </>
  );
};
