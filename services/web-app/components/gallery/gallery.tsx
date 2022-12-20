import { GalleryWrapper, GalleryFooter } from "./styled"
import type { CollectionInfoQuery } from '../../.utils/gql/types/graphql'
import { GalleryHeader } from './galleryHeader';
import { GalleryRows } from './galleryRows';

type GalleryProps = {
  user: string,
  bio: string,
  contracts: CollectionInfoQuery[]
}

export const Gallery = ({user, bio, contracts} : GalleryProps) => {

  return (
    <GalleryWrapper>
      <GalleryHeader user={user} bio={bio}/>
      <GalleryRows contracts={contracts}/>
      <GalleryFooter />
    </GalleryWrapper>
  )
}