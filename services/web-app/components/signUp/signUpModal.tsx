import { Modal } from "../../components/modal";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { ButtonInner, ButtonOuter } from "../button";
import { useQuery } from '@apollo/client';


const InsideSignUpModalWrapper = styled.div`
  height: 500px;
  width: 450px;
`
const CreateProfileWrapper = styled.div`

`
const StyledInput = styled.input`
  width: 90%;
  height: 20px;
  margin-left: 14px;
  margin-Bottom: 8px;
  border: 1px solid black;
  background-color: #EBEBEB;
`
const StyledLabel = styled.label`
  margin-left: 14px;
`
const StyledForm = styled.form`
  margin: 15px;
`
const StyledTextArea = styled.textarea`
  width: 90%;
  margin-left: 14px;
  border: 1px solid black;
  background-color: #EBEBEB;
  height: 150px;
`

type SignUpModalProps = {
  toggleShowModal: Dispatch<SetStateAction<Boolean>>;
}

export const SignUpModal = ({ toggleShowModal } : SignUpModalProps) => {
  return (
    <>
      <Modal
        toggleShowModal={toggleShowModal}
        title="Create Profile"
        height="500px"
        width="450px"
        defaultPosition={{
          x: 40,
          y: 40,
        }}
      >
        <InsideSignUpModal />
      </Modal>
    </>
  )
}

const InsideSignUpModal = () => {

  return (
    <InsideSignUpModalWrapper>
      <ConnectedAddress />
      <CreateProfile />
    </InsideSignUpModalWrapper>
  )
}

const ConnectedAddress = () => {
  return (
    <></>
  )
}

const CreateProfile = () => {

  const [username, setUsername] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [contracts, setContracts] = useState<string[]>([]);

  return (
    <CreateProfileWrapper>
      <StyledForm>
        <StyledLabel>
          Set Name: <br/>
          <StyledInput required type="text" name="name" onChange={(e) => setUsername(e.target.value)}/>
        </StyledLabel>
        <StyledLabel>
          Set Description: <br/>
          <StyledTextArea required maxLength={280} name="description" onChange={(e) => setBio(e.target.value)}/>
        </StyledLabel>
        <ShowCollections />
        <ButtonOuter>
          <ButtonInner type="submit" onClick={() => {}}>Submit</ButtonInner>
        </ButtonOuter>
      </StyledForm>
    </CreateProfileWrapper>
  )
}

const ShowCollectionsWrapper = styled.div`

`

const ShowCollections = () => {
  return (
    <ShowCollectionsWrapper>

    </ShowCollectionsWrapper>
  )
}