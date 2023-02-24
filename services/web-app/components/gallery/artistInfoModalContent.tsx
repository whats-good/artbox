import { ArtistBioModalInsideWrapper, ReadBioWrapper } from "./styles";
import type { ArtistBioModalInsideProps, ReadBioProps } from "./types";

export const ArtistBioModalInside = ({ bio }: ArtistBioModalInsideProps) => {
  return (
    <ArtistBioModalInsideWrapper>
      <ReadBio bio={bio} />
    </ArtistBioModalInsideWrapper>
  );
};

const ReadBio = ({ bio }: ReadBioProps) => {
  return <ReadBioWrapper>{bio}</ReadBioWrapper>;
};
