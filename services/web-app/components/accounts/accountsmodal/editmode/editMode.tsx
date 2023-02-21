import { useState } from "react";
import styled from "styled-components";
import { useAccount, useSigner } from "wagmi";
import { ModalSignMessage } from "../../../shared/signMessage";
import { AddCollections } from "./addCollections";
import { ShowCollections } from "./showCollections";
import type { UserData } from "../accounts";
import { EditDescription } from "./editDescription";

const EditAccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
`;

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

const UsernameText = styled.p`
  align-self: flex-start;
`;

const SignedInView = ({ userData }: SignedInViewProps) => {
  const [descriptionEditMode, setDescriptionEditMode] = useState(false);
  const [description, setDescription] = useState(
    userData.description ? userData.description : ""
  );
  const [contracts, setContracts] = useState(
    userData.contracts.map((c) => c.contractAddress)
  );

  return (
    <>
      <UsernameText>Username: {userData.username}</UsernameText>
      <EditDescription
        descriptionEditMode={descriptionEditMode}
        setDescriptionEditMode={setDescriptionEditMode}
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
