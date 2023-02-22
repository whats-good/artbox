import { uuid } from "uuidv4";
import { useMutation } from "@apollo/client";
import { shortenAddress } from "../../../../helpers/shortenAddress";
import { deleteContractMutation } from "../../../../querys/internal";
import { ModelExitButtonWrapper, ModelExitButton } from "../../../modal";
import { ShowCollectionsProps, CollectionDisplayProps } from "./types";
import { CollectionDisplayWrapper, ShowCollectionsWrapper } from "./styles";

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
