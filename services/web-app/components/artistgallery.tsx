import { GalleryWrapper, GalleryUpperBar, GalleryMiddle, GalleryBottom } from "./styled/gallery";
import { GridDisplay } from "./griddisplay";
import { ArtistTitle } from '../components/artisttitle';
import { ArtistDescription } from '../components/artistdescription';


interface ArtistGalleryProps {
contracts: String[],
description: String,
name: String,
}


export function ArtistGallery( { meta, name, desc } : any) {
  return (
    <GalleryWrapper>
      <GalleryUpperBar>
        <ArtistTitle name={name}/>
        <ArtistDescription description={desc}/>
      </GalleryUpperBar>
      <GalleryMiddle>
        <GridDisplay meta={meta}/>
        {/* <SortWindow /> */}
      </GalleryMiddle>
      <GalleryBottom />
    </GalleryWrapper>
  )
}