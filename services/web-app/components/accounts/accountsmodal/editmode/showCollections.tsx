import styled from "styled-components";
import { uuid } from "uuidv4";
import { Dispatch, SetStateAction } from "react";
import { useMutation } from "@apollo/client";
import { shortenAddress } from "../../../../helpers/shortenAddress";
import { deleteContractMutation } from "../../../../querys/internal";
import { ModelExitButtonWrapper, ModelExitButton } from "../../../modal";

type ShowCollectionsProps = {
  username: string;
  contracts: string[];
  setContracts: Dispatch<SetStateAction<string[]>>;
};
type CollectionDisplayProps = {
  contracts: string[];
  contract: string;
  username: string;
  setContracts: Dispatch<SetStateAction<string[]>>;
};

const ShowCollectionsWrapper = styled.div`
  width: 388px;
  background-color: #ebebeb;
  height: 80px;
  overflow-y: scroll;
  border: 1px solid black;
  margin: 10px 0px 0px 5px;
`;
const CollectionDisplayWrapper = styled.div`
  justify-content: space-between;
  padding: 4px 4px;
  display: flex;
  border-bottom: 1px solid black;
`;

export const ShowCollections = ({
  contracts,
  username,
  setContracts,
}: ShowCollectionsProps) => {
  return (
    <ShowCollectionsWrapper>
      {contracts.map((contract, i, contracts) => (
        <CollectionDisplay
          setContracts={setContracts}
          username={username}
          key={uuid()}
          contracts={contracts}
          contract={contract}
        />
      ))}
    </ShowCollectionsWrapper>
  );
};

const CollectionDisplay = ({
  contracts,
  setContracts,
  contract,
  username,
}: CollectionDisplayProps) => {
  const [mutateFunction, { data, loading, error }] = useMutation(
    deleteContractMutation
  );

  return (
    <CollectionDisplayWrapper>
      {shortenAddress(contract)}
      <ModelExitButtonWrapper>
        <ModelExitButton
          onClick={async (e) => {
            e.preventDefault();
            //Delete Contract
            const deletedContract = await mutateFunction({
              variables: {
                username: username,
                address: contract,
              },
            });
            if (!deletedContract.errors) {
              const arr = contracts.filter((c) => c !== contract);
              setContracts(arr);
            }
          }}
        >
          x
        </ModelExitButton>
      </ModelExitButtonWrapper>
    </CollectionDisplayWrapper>
  );
};
