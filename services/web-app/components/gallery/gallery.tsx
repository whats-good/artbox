import styled from "styled-components";
import type { CollectionInfoQuery } from "../../.utils/zoraTypes/graphql";
import { GalleryHeader } from "./galleryHeader";
import { GalleryRows } from "./galleryRows";

type GalleryProps = {
  user: string;
  bio: string;
  contracts: CollectionInfoQuery[];
  userAddress: string;
};

const GalleryWrapper = styled.div`
  height: 93%;
  border: 1px solid black;
  margin: 10px;
  background-color: #ebebeb;
  display: grid;
  grid-template-rows: 100px;
`;

export const Gallery = ({
  user,
  bio,
  contracts,
  userAddress,
}: GalleryProps) => {
  return (
    <GalleryWrapper>
      <GalleryHeader user={user} bio={bio} userAddress={userAddress} />
      <GalleryRows contracts={contracts} />
    </GalleryWrapper>
  );
};
