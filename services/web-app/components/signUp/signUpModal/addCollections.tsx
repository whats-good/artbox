import { useProvider } from "wagmi";
import styled from "styled-components";
import { uuid } from "uuidv4";
import { useState, Dispatch, SetStateAction } from "react";
import { StyledForm, StyledLabel, StyledInput } from "./commonStyles";
import { ButtonInner, ButtonOuter } from "../../button";
import { validateContract } from "../../../helpers";
import { shortenAddress } from "../../../helpers/shortenAddress";

//Types
type AddCollectionsProps = {
  setContracts: Dispatch<SetStateAction<string[]>>;
  contracts: string[];
}
type ShowCollectionsProps = {
  contracts: string[];
  setContracts: Dispatch<SetStateAction<string[]>>;
}
type CollectionDisplayProps = {
  contracts: string[];
  contract: string;
  setContracts: Dispatch<SetStateAction<string[]>>;
}

//Styles
const ShowCollectionsWrapper = styled.div`
`
const CollectionDisplayWrapper = styled.div`
`

export const AddCollections = ({ contracts, setContracts } : AddCollectionsProps) => {

  const [ contractAddress, setContractAddress ] = useState<string>('')

  const provider = useProvider()

  return (
    <StyledForm>
      <StyledLabel>
          Add Collection: <br/>
          <StyledInput required type="text" name="name" value={contractAddress} onChange={(e) => setContractAddress(e.target.value)} />
        </StyledLabel>
        <ButtonOuter>
          <ButtonInner onClick={(e) => {

            //Check if contract is valid before pushing it into state array
            e.preventDefault();

            const validatedContract = validateContract(contractAddress, provider);

            if (validatedContract.valid) {
              setContracts([...contracts, contractAddress])
            }

          }}>
            Submit
          </ButtonInner>
        </ButtonOuter>
      </StyledForm>
  )
}

export const ShowCollections = ({ contracts, setContracts } : ShowCollectionsProps) => {

  return (
    <ShowCollectionsWrapper>
      {contracts.map((contract, i, contracts) => <CollectionDisplay key={uuid()} contracts={contracts} contract={contract} setContracts={setContracts}/>)}
    </ShowCollectionsWrapper>
  )
}

const CollectionDisplay = ({ contracts, contract, setContracts } : CollectionDisplayProps) => {
  return (
    <CollectionDisplayWrapper>
      {shortenAddress(contract)}
      {/* <button onClick={(e) => {

        //This removes contract from state
        e.preventDefault();
        const index = contracts.indexOf(contract);
        if (index > -1) {
          const newArr = contracts.splice(index, 1);
          setContracts(newArr);
        }
      }}>X</button> */}
    </CollectionDisplayWrapper>
  )
}