import { useProvider } from "wagmi";
import { uuid } from "uuidv4";
import { useState } from "react";
import { ButtonInner } from "../../button";
import { shortenAddress } from "../../../helpers/shortenAddress";
import { ModelExitButtonWrapper, ModelExitButton } from "../../modal";
import { validateContract } from "../../../helpers";
import {
  StyledLabel,
  AddCollectionInput,
  AddButton,
  ShowCollectionsWrapper,
  CollectionDisplayWrapper,
} from "./styles";
import type {
  AddCollectionsProps,
  ShowCollectionsProps,
  CollectionDisplayProps,
} from "./types";

export const AddCollections = ({
  contracts,
  setContracts,
  userAddress,
}: AddCollectionsProps) => {
  const [contractAddress, setContractAddress] = useState<string>("");

  const provider = useProvider();

  return (
    <>
      <StyledLabel htmlFor="signup">
        Add Collection: <br />
      </StyledLabel>
      <AddCollectionInput
        type="text"
        name="name"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />

      <AddButton>
        <ButtonInner
          onClick={async (e) => {
            e.preventDefault();

            //Check if contract is valid before pushing it into state array
            const validContract = validateContract(contractAddress, provider);

            if (validContract.valid) {
              //Prevents adding same contract twice
              if (!contracts.includes(contractAddress)) {
                setContracts([...contracts, validContract.contract]);
                setContractAddress("");
              } else {
                setContractAddress("");
              }
            }
          }}
        >
          Add
        </ButtonInner>
      </AddButton>
    </>
  );
};

export const ShowCollections = ({
  contracts,
  setContracts,
  userAddress,
}: ShowCollectionsProps) => {
  return (
    <ShowCollectionsWrapper>
      {contracts.map((contract, i, contracts) => (
        <CollectionDisplay
          userAddress={userAddress}
          key={uuid()}
          contracts={contracts}
          contract={contract}
          setContracts={setContracts}
        />
      ))}
    </ShowCollectionsWrapper>
  );
};

const CollectionDisplay = ({
  contracts,
  contract,
  setContracts,
  userAddress,
}: CollectionDisplayProps) => {
  return (
    <CollectionDisplayWrapper>
      {shortenAddress(contract)}
      <ModelExitButtonWrapper>
        <ModelExitButton
          onClick={(e) => {
            e.preventDefault();
            const arr = contracts.filter((c) => c !== contract);
            setContracts(arr);
          }}
        >
          x
        </ModelExitButton>
      </ModelExitButtonWrapper>
    </CollectionDisplayWrapper>
  );
};
