import { GalleryHeader } from "./galleryHeader";
import { GalleryRows } from "./galleryRows";
import type { GalleryProps } from "./types";
import { GalleryWrapper } from "./styles";

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
