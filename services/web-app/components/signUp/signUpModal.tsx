import { Modal } from "../../components/modal";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { ButtonInner, ButtonOuter } from "../button";
import { useQuery } from '@apollo/client';
import { validateContract } from "../../querys";
import { ValidateContractQuery } from "../../.utils/gql/types/graphql";
import { useAccount } from 'wagmi';

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

const ConnectWalletMessageWrapper = styled.div`

`
const ConnectWalletMessage = () => {
  return (
    <></>
  )
}


const InsideSignUpModal = () => {
  const { address, isConnecting, isDisconnected } = useAccount();

  if (!address) return <ConnectWalletMessage />

  return (
    <InsideSignUpModalWrapper>
      {address ?
        <>
          <ConnectedAddress address={address}/>
        </>
      : <ConnectWalletMessage />}
    </InsideSignUpModalWrapper>
  )
}

type ConnectedAddressProps = {
  address: string;
}

const ConnectedAddress = ({ address } : ConnectedAddressProps) => {
  return (
    <></>
  )
}

type CreateProfileProps = {
  address: string;
}

const CreateProfile = ({ address } : CreateProfileProps) => {

  const [accountExists, setAccountExists] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [contracts, setContracts] = useState<ValidateContractQuery[]>([]);

  useEffect(() => {
    //Check if address is in the DB
      // If yes,
      // Set accountExists to true,
      // Set username
      // Set Description
  }, [])


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
        <AddCollections />
        {/* <ShowCollections contracts={contracts} setContracts={setContracts}/> */}
        <ButtonOuter>
          <ButtonInner type="submit" onClick={() => {}}>Submit</ButtonInner>
        </ButtonOuter>
      </StyledForm>
    </CreateProfileWrapper>
  )
}

const AddCollections = () => {
  return (
    <></>
  )
}



const ShowCollectionsWrapper = styled.div`

`

type ShowCollectionsProps = {
  contracts: string[];
  setContracts: Dispatch<SetStateAction<string[]>>;
}

const ShowCollections = ({ contracts, setContracts } : ShowCollectionsProps) => {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    validateContract,
    {
      variables: {
        contractAddress: {collectionAddresses: ['']}
      }
    }
  )

  return (
    <ShowCollectionsWrapper>
      {/* {contracts.map((contract) => <CollectionDisplay />)} */}
    </ShowCollectionsWrapper>
  )
}

type CollectionDisplayProps = {
  address: string;
  count: number;
}

const CollectionDisplayWrapper = styled.div`

`

const CollectionDisplay = ({ address, count } : CollectionDisplayProps) => {
  return (
    <CollectionDisplayWrapper>
    {address + '....' + count}
    </CollectionDisplayWrapper>
  )
}

//Must connect wallet.
  //If wallet is connected,
    //Check if it is existing user
      //If so, populate data accordingly
    //If not,