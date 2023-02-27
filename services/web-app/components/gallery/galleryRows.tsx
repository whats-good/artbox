import { GalleryRow } from "./galleryRow";
import type { GalleryRowsProps } from "./types";
import { GalleryRowsWrapper } from "./styles";
import { uuid } from "uuidv4";

export const GalleryRows = ({ contracts }: GalleryRowsProps) => {
  return (
    <GalleryRowsWrapper>
      {contracts.map((contract) => (
        <GalleryRow key={uuid()} contract={contract}></GalleryRow>
      ))}
    </GalleryRowsWrapper>
  );
};
