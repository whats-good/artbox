import { useProvider } from "wagmi";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { useState, Dispatch, SetStateAction } from "react";
import { ButtonInner, ButtonOuter } from "../../../button";
import { validateContract } from "../../../../helpers";
import {
  StyledLabel,
  StyledInput,
  StyledForm,
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
`;

const AddCollectionInput = styled(StyledInput)`
  width: 98.5%;
`;
const ButtonMessageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  align-items: center;
`;
const Message = styled.p`
  margin: 0px 5px 0px 0px;
  padding: 0px;
`;

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
