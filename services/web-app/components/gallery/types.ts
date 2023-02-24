import { Dispatch, SetStateAction } from "react";
import { UserData } from "../accounts/accountsmodal/types";
import type { CollectionInfoQuery } from "../../.utils/zoraTypes/graphql";

export type ArtistBioModalInsideProps = {
  bio: string;
};
export type ReadBioProps = {
  bio: string;
};
export type GalleryProps = {
  user: string;
  bio: string;
  contracts: CollectionInfoQuery[];
  userAddress: string;
};
export type EditAccountModalProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
  data: UserData;
};
export type GalleryHeaderProps = {
  user: string;
  bio: string;
  userAddress: string;
};
export type ArtistInfoButtonProps = {
  bio: string;
  userAddress: string;
  username: string;
};
export type GalleryRowProps = {
  contract: CollectionInfoQuery;
};
export type GalleryRowsProps = {
  contracts: CollectionInfoQuery[];
};
