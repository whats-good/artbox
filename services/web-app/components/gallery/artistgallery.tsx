import {
  GalleryWrapper,
  GalleryUpperBar,
  GalleryMiddle,
  GalleryBottom,
} from "./styled/gallery";
import { GridDisplay } from "./griddisplay";
import { ArtistTitle } from "./artisttitle";
import { ArtistDescription } from "./artistdescription";

interface ArtistGalleryProps {
  contracts: String[];
  description: String;
  name: String;
}

export function ArtistGallery({ meta, name, desc }: any) {
  return (
    <GalleryWrapper>
      <GalleryUpperBar>
        <ArtistTitle name={name} />
        <ArtistDescription description={desc} />
      </GalleryUpperBar>
      <GalleryMiddle>
        {meta ? <GridDisplay meta={meta} /> : <>Nope</>}
        {/* <SortWindow /> */}
      </GalleryMiddle>
      <GalleryBottom />
    </GalleryWrapper>
  );
}