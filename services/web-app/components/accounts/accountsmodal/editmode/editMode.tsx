import { useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { ModalSignMessage } from "../../../shared/signMessage";
import { AddCollections } from "./addCollections";
import { ShowCollections } from "./showCollections";
import { EditAccountProps, SignedInViewProps } from "./types";
import { EditDescription } from "./editDescription";
import { EditAccountWrapper, UsernameText } from "./styles";
import { ModalConnectWallet } from "../../../shared/connectWallet";

export const EditAccount = ({ data }: EditAccountProps) => {
  const [signedIn, setSignedIn] = useState<boolean>(false);

  const { address } = useAccount();

  const { data: signer } = useSigner();

  if (!address) {
    return (
      <EditAccountWrapper>
        <ModalConnectWallet />
      </EditAccountWrapper>
    );
  } else if (!signedIn) {
    return (
      <EditAccountWrapper>
        <ModalSignMessage
          address={address}
          signer={signer}
          loggedInFunction={setSignedIn}
        />
      </EditAccountWrapper>
    );
  } else {
    return (
      <EditAccountWrapper>
        <SignedInView userData={data} />
      </EditAccountWrapper>
    );
  }
};

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
