import { Dispatch, SetStateAction } from "react";
import type { UserData } from "../accounts";

export type AddCollectionsProps = {
  username: string;
  contracts: string[];
  setContracts: Dispatch<SetStateAction<string[]>>;
};
export type EditDescriptionProps = {
  description: string;
  username: string;
  descriptionEditMode: boolean;
  setDescription: Dispatch<SetStateAction<string>>;
  setDescriptionEditMode: Dispatch<SetStateAction<boolean>>;
};
export type EditAccountProps = {
  data: UserData;
};
export type SignedInViewProps = {
  userData: UserData;
};
export type ShowCollectionsProps = {
  username: string;
  contracts: string[];
  setContracts: Dispatch<SetStateAction<string[]>>;
};
export type CollectionDisplayProps = {
  contracts: string[];
  contract: string;
  username: string;
  setContracts: Dispatch<SetStateAction<string[]>>;
};
