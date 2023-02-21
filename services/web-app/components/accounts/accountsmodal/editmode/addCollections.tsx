import { useProvider } from "wagmi";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { useState, Dispatch, SetStateAction } from "react";
import { ButtonInner, ButtonOuter } from "../../../button";
import { validateContract } from "../../../../helpers";
import {
  StyledLabel,
  StyledInput,
} from "../../../signUp/signUpModal/commonStyles";
import { createContract } from "../../../../querys/internal";

//Types
type AddCollectionsProps = {
  username: string;
  contracts: string[];
  setContracts: Dispatch<SetStateAction<string[]>>;
};

//Styles
const AddButton = styled(ButtonOuter)`
  align-self: flex-end;
  width: 25%;
  margin-right: -6px;
`;

const AddCollectionInput = styled(StyledInput)`
  width: 100%;
`;

export const AddCollections = ({
  username,
  contracts,
  setContracts,
}: AddCollectionsProps) => {
  const [contractAddress, setContractAddress] = useState<string>("");
  const [mutateFunction, { data, loading, error }] =
    useMutation(createContract);

  const provider = useProvider();

  return (
    <>
      <StyledLabel>
        Add Collection: <br />
        <AddCollectionInput
          type="text"
          name="name"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
      </StyledLabel>
      <AddButton>
        <ButtonInner
          onClick={async (e) => {
            e.preventDefault();

            //Check if contract is valid before pushing it into state array
            const validContract = validateContract(contractAddress, provider);

            if (validContract.valid) {
              //Add contract to account
              const addedContract = await mutateFunction({
                variables: {
                  address: validContract.contract,
                  username: username,
                },
              });
              if (addedContract.data?.createContract.contractAddress) {
                setContracts([
                  ...contracts,
                  addedContract.data.createContract.contractAddress,
                ]);
              }
              console.log("ADDED CONTRACT: ", addedContract);
            }
          }}
        >
          Add
        </ButtonInner>
      </AddButton>
    </>
  );
};
