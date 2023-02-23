import { useContext, useState } from "react";
import { useSigner } from "wagmi";
import { createOrUpdateUser } from "../../../helpers";
import { LoggedInContext } from "../../../utils/loggedInContext";
import { ButtonInner } from "../../button";
import { AddCollections, ShowCollections } from "./addCollections";
import { ModalSignMessage } from "../../shared/signMessage";
import type { CreateProfileProps } from "./types";
import {
  CreateProfileWrapper,
  StyledTextArea,
  SubmitButton,
  StyledLabel,
  StyledInput,
  StyledForm,
} from "./styles";

export const CreateProfile = ({
  address,
  toggleShowModal,
}: CreateProfileProps) => {
  const [loggedIn, setLoggedIn] = useContext<any>(LoggedInContext);
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [contracts, setContracts] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const { data: signer } = useSigner();

  if (!loggedIn) {
    return (
      <ModalSignMessage
        address={address}
        signer={signer}
        loggedInFunction={setLoggedIn}
      />
    );
  }
  return (
    <CreateProfileWrapper>
      <StyledForm>
        <StyledLabel>
          Set Name: <br />
          <StyledInput
            required
            type="text"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </StyledLabel>
        <StyledLabel>
          Set Description: <br />
          <StyledTextArea
            required
            maxLength={280}
            value={bio}
            name="description"
            onChange={(e) => setBio(e.target.value)}
          />
        </StyledLabel>
        <AddCollections
          contracts={contracts}
          setContracts={setContracts}
          userAddress={address}
        />
        <ShowCollections
          userAddress={address}
          contracts={contracts}
          setContracts={setContracts}
        />
        <p>{message}</p>
        <SubmitButton>
          <ButtonInner
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              const createProfile = await createOrUpdateUser({
                address: address,
                bio: bio,
                username: username,
                contracts: contracts,
              });
              if (createProfile.success) {
                setMessage("Success!");
              } else {
                setMessage(
                  "Something went wrong...Please make sure username is not taken"
                );
              }
            }}
          >
            Submit
          </ButtonInner>
        </SubmitButton>
      </StyledForm>
    </CreateProfileWrapper>
  );
};
