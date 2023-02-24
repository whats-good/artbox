import { Dispatch, SetStateAction } from "react";

export type SignUpModalProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
};
export type ConnectedAddressProps = {
  address: string;
};
export type InsideSignUpModalProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
};
export type CreateProfileProps = {
  address: string;
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
};
export type AddCollectionsProps = {
  setContracts: Dispatch<SetStateAction<string[]>>;
  contracts: string[];
  userAddress: string;
};
export type ShowCollectionsProps = {
  contracts: string[];
  setContracts: Dispatch<SetStateAction<string[]>>;
  userAddress: string;
};
export type CollectionDisplayProps = {
  contracts: string[];
  contract: string;
  setContracts: Dispatch<SetStateAction<string[]>>;
  userAddress: string;
};
