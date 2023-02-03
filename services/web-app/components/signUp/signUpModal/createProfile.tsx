
import styled from "styled-components";
import { useContext, useEffect, useState, Dispatch, SetStateAction } from "react";
import { useSigner } from "wagmi";
import { createOrUpdateUser } from "../../../helpers"
import { signInWithEthereum } from "../../../siwe";
import { LoggedInContext } from "../../../utils/loggedInContext";
import { ButtonInner, ButtonOuter } from "../../button";
import { StyledLabel, StyledInput, StyledForm } from "./commonStyles";
import { AddCollections, ShowCollections } from "./addCollections";
import { populateSignUpForm } from "../../../helpers"

//Types
type CreateProfileProps = {
  address: string;
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
}

//Styles
const CreateProfileWrapper = styled.div`
`;
const PleaseSignMessageButton = styled(ButtonOuter)`
  width: 90%;
  margin: auto;
`


const StyledTextArea = styled.textarea`
  width: 90%;
  margin-left: 14px;
  border: 1px solid black;
  background-color: #EBEBEB;
  height: 150px;
`;

export const CreateProfile = ({ address, toggleShowModal } : CreateProfileProps) => {

  const [loggedIn, setLoggedIn] = useContext<any>(LoggedInContext);
  const [username, setUsername] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [contracts, setContracts] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const { data: signer } = useSigner()

  useEffect(() => {
    populateSignUpForm({address: address}).then((res) => {
      if (res.userExists) {
        setUsername(res.username);
        setBio(res.description);
        setContracts(res.contracts)
      }
    })
  }, [address])

  if (!loggedIn) {
    return (
      <PleaseSignMessageButton>
        <ButtonInner onClick={ async () => {
          const signedIn = await signInWithEthereum(address, signer, window.location.host, window.location.origin);
          if (signedIn.ok) {
            setLoggedIn(true);
          }
        }}>
          Please sign a message to create or edit your account.
        </ButtonInner>
    </PleaseSignMessageButton>
    )
  }

  return (
    <CreateProfileWrapper>
      <StyledForm>
        <StyledLabel>
          Set Name: <br/>
          <StyledInput required type="text" name="name" value={username} onChange={(e) => setUsername(e.target.value)} />
        </StyledLabel>
        <StyledLabel>
          Set Description: <br/>
          <StyledTextArea required maxLength={280} value={bio} name="description" onChange={(e) => setBio(e.target.value)}/>
        </StyledLabel>
        <AddCollections contracts={contracts} setContracts={setContracts} userAddress={address}/>
        <ShowCollections userAddress={address} contracts={contracts} setContracts={setContracts}/>
        <p>{message}</p>
        <ButtonOuter>
          <ButtonInner type="submit" onClick={ async (e) => {
            e.preventDefault();
            const createProfile = await createOrUpdateUser({
              address: address,
              bio: bio,
              username: username,
              contracts: contracts,
            })
            if (createProfile.success) {
              // toggleShowModal(false);
              setMessage("Success!")
            } else {
              setMessage("Something went wrong...Please make sure username is not taken")
            }
          }}>
            Submit
          </ButtonInner>
        </ButtonOuter>
      </StyledForm>
    </CreateProfileWrapper>
  )
}