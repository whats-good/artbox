import { useState } from "react";
import styled from "styled-components";
import { useAccount, useSigner } from "wagmi";
import { ModalSignMessage } from "../../shared/signMessage";
import { useMutation, useQuery } from "@apollo/client";
import { AddCollections, ShowCollections } from "./addCollections";
import { editUser, userInfo } from "../../../querys/internal";
import type { UserData } from "./accountsView";

const EditAccountWrapper = styled.div``;

type EditAccountProps = {
  data: UserData;
};
type SignedInViewProps = {
  userData: UserData;
};

export const EditAccount = ({ data }: EditAccountProps) => {
  const [signedIn, setSignedIn] = useState<boolean>(false);

  const { address } = useAccount();

  const { data: signer } = useSigner();

  return (
    <EditAccountWrapper>
      {!signedIn && address ? (
        <ModalSignMessage
          address={address}
          signer={signer}
          loggedInFunction={setSignedIn}
        />
      ) : (
        <SignedInView userData={data} />
      )}
    </EditAccountWrapper>
  );
};

const SignedInView = ({ userData }: SignedInViewProps) => {
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
