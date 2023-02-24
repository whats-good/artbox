import { GalleryRow } from "./galleryRow";
import type { GalleryRowsProps } from "./types";
import { GalleryRowsWrapper } from "./styles";

export const GalleryRows = ({ contracts }: GalleryRowsProps) => {
  return (
    <GalleryRowsWrapper>
      {contracts.map((contract) => (
        <GalleryRow
          key={contract.collections.nodes[0].address}
          contract={contract}
        ></GalleryRow>
      ))}
    </GalleryRowsWrapper>
  );
};
