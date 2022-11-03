import { GalleryImage, GalleryImageTop, GalleryImageBottom, GalleryImg } from './styled/galleryimagewrapper';

export function GridItem ({ imageDetails } : any) {
  return (
    <GalleryImage>
      <GalleryImageTop>
        <GalleryImg src={imageDetails.imageURL}/>
      </GalleryImageTop>
      <GalleryImageBottom>
        <p>{imageDetails.name}</p>
      </GalleryImageBottom>
    </GalleryImage>
  )
};