import { useState } from "react";
import styled from "styled-components";
import { useAccount, useSigner } from "wagmi";
import { ModalSignMessage } from "../../../shared/signMessage";
import { useMutation, useQuery } from "@apollo/client";
import type { ApolloQueryResult } from "@apollo/client";
import { GetAccountsQuery } from "../../../../.utils/internalTypes/graphql";
import { AddCollections } from "./addCollections";
import { ShowCollections } from "./showCollections";
import { editUser } from "../../../../querys/internal";
import type { UserData } from "../accounts";
import { EditDescription } from "./editDescription";

const EditAccountWrapper = styled.div``;

export type Refetch = (
  variables?:
    | Partial<{
        address: string;
      }>
    | undefined
) => Promise<ApolloQueryResult<GetAccountsQuery>>;

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
  const [description, setDescription] = useState(
    userData.description ? userData.description : ""
  );
  const [contracts, setContracts] = useState(
    userData.contracts.map((c) => c.contractAddress)
  );

  return (
    <>
      <p>Username: {userData.username}</p>
      <EditDescription
        username={userData.username}
        description={description}
        setDescription={setDescription}
      />
      <AddCollections
        contracts={contracts}
        setContracts={setContracts}
        username={userData.username}
      />
      <ShowCollections
        contracts={contracts}
        setContracts={setContracts}
        username={userData.username}
      />
    </>
  );
};
