import { useProvider } from "wagmi";
import styled from "styled-components";
import { uuid } from "uuidv4";
import { useState, Dispatch, SetStateAction } from "react";
import { StyledForm, StyledLabel, StyledInput } from "./commonStyles";
import { ButtonInner, ButtonOuter } from "../../button";
import { addContract, deleteContract } from "../../../helpers";
import { shortenAddress } from "../../../helpers/shortenAddress";
import { ModelExitButtonWrapper, ModelExitButton } from "../../modal"

//Types
type AddCollectionsProps = {
  setContracts: Dispatch<SetStateAction<string[]>>;
  contracts: string[];
  userAddress: string;
}
type ShowCollectionsProps = {
  contracts: string[];
  setContracts: Dispatch<SetStateAction<string[]>>;
  userAddress: string;
}
type CollectionDisplayProps = {
  contracts: string[];
  contract: string;
  setContracts: Dispatch<SetStateAction<string[]>>;
  userAddress: string;
}

//Styles
const ShowCollectionsWrapper = styled.div`
`
const CollectionDisplayWrapper = styled.div`
`
const AddButton = styled(ButtonOuter)`
  width: 25%;
`
const AddCollectionInput = styled(StyledInput)`
  margin-left: none;
  width: 95%;
`;

export const AddCollections = ({ contracts, setContracts, userAddress } : AddCollectionsProps) => {

  const [ contractAddress, setContractAddress ] = useState<string>('')

  const provider = useProvider()

  return (
    <StyledForm>
      <StyledLabel>
          Add Collection: <br/>
          <AddCollectionInput required type="text" name="name" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} />
        </StyledLabel>
        <AddButton>
          <ButtonInner onClick={ async (e) => {
            //Check if contract is valid before pushing it into state array
            e.preventDefault();
            const contract = await addContract({
              contractAddress: contractAddress,
              userAddress: userAddress,
              provider: provider,
            })
            if (contract.success) {
              setContracts([...contracts, contract.addedContract])
            }
          }}>
            Add
          </ButtonInner>
        </AddButton>
      </StyledForm>
  )
}

export const ShowCollections = ({ contracts, setContracts, userAddress } : ShowCollectionsProps) => {

  return (
    <ShowCollectionsWrapper>
      {contracts.map((contract, i, contracts) => <CollectionDisplay userAddress={userAddress} key={uuid()} contracts={contracts} contract={contract} setContracts={setContracts}/>)}
    </ShowCollectionsWrapper>
  )
}

const CollectionDisplay = ({ contracts, contract, setContracts, userAddress } : CollectionDisplayProps) => {

  return (
    <CollectionDisplayWrapper>
      {shortenAddress(contract)}
      <ModelExitButtonWrapper>
        <ModelExitButton onClick={ async (e) => {
          e.preventDefault();
          const deletedContract = await deleteContract({
            contractAddress: contract,
            userAddress: userAddress,
          })
          if (deletedContract.success) {
            const newArr = contracts.filter((item) => item !== deletedContract.deletedAddress);
            setContracts(newArr);
          }
        }}>
          x
        </ModelExitButton>
      </ModelExitButtonWrapper>
    </CollectionDisplayWrapper>
  )
}