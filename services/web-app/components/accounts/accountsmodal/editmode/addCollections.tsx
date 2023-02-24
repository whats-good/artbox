import { useProvider } from "wagmi";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ButtonInner } from "../../../button";
import { validateContract } from "../../../../helpers";
import { AddCollectionsProps } from "./types";
import { createContract } from "../../../../querys/internal";
import { StyledLabel, StyledForm } from "../../../signUp/signUpModal/styles";
import {
  AddCollectionInput,
  ButtonMessageWrapper,
  Message,
  AddButton,
} from "./styles";

export const AddCollections = ({
  username,
  contracts,
  setContracts,
}: AddCollectionsProps) => {
  const [contractAddress, setContractAddress] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [mutateFunction, { data, loading, error }] =
    useMutation(createContract);

  const provider = useProvider();

  return (
    <StyledForm>
      <StyledLabel htmlFor="collection">
        Add Collection: <br />
      </StyledLabel>
      <AddCollectionInput
        type="text"
        name="collection"
        id="collection"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
      />
      <ButtonMessageWrapper>
        <Message>{message}</Message>
        <AddButton>
          <ButtonInner
            type="submit"
            onClick={async (e) => {
              e.preventDefault();
              setMessage("");
              //Check if contract is valid before pushing it into state array
              const validContract = validateContract(contractAddress, provider);

              if (validContract.valid) {
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
                  setMessage("Successfully Added");
                  setContractAddress("");
                }
              } else {
                setMessage("Failed");
              }
            }}
          >
            Add
          </ButtonInner>
        </AddButton>
      </ButtonMessageWrapper>
    </StyledForm>
  );
};
