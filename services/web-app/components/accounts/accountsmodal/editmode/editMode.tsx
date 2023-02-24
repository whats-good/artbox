import { useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { ModalSignMessage } from "../../../shared/signMessage";
import { AddCollections } from "./addCollections";
import { ShowCollections } from "./showCollections";
import { EditAccountProps, SignedInViewProps } from "./types";
import { EditDescription } from "./editDescription";
import { UsernameText } from "./styles";
import { ModalConnectWallet } from "../../../shared/connectWallet";
import { FormWrapper } from "../../../shared/styles";
import { ConnectedAccount } from "../../../connectwallet";

export const EditAccount = ({ data }: EditAccountProps) => {
  const [signedIn, setSignedIn] = useState<boolean>(false);

  const { address } = useAccount();

  const { data: signer } = useSigner();

  if (!address) {
    return <ModalConnectWallet />;
  } else if (!signedIn) {
    return (
      <ModalSignMessage
        address={address}
        signer={signer}
        loggedInFunction={setSignedIn}
      />
    );
  } else {
    return (
      <FormWrapper>
        <ConnectedAccount connectedAddress={address} />
        <SignedInView userData={data} />
      </FormWrapper>
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
