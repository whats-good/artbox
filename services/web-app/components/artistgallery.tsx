import { GalleryWrapper, GalleryUpperBar, GalleryMiddle, GalleryBottom } from "./styled/gallery";
import { GridDisplay } from "./griddisplay";
import { ArtistTitle } from '../components/artisttitle';
import { ArtistDescription } from '../components/artistdescription';
// import { SortWindow } from "./sortwindow";


interface ArtistGalleryProps {
contracts: String[],
description: String,
name: String,
}


export function ArtistGallery( { contracts, description, name } : ArtistGalleryProps) {
  return (
    <GalleryWrapper>
      <GalleryUpperBar>
        <ArtistTitle name={name}/>
        <ArtistDescription description={description}/>
      </GalleryUpperBar>
      <GalleryMiddle>
        {contracts ? <GridDisplay contracts={contracts}/> : <p>Loading....</p> }
        {/* <SortWindow /> */}
      </GalleryMiddle>
      <GalleryBottom />
    </GalleryWrapper>
  )
}