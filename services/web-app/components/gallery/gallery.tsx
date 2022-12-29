import styled from 'styled-components';
import type { CollectionInfoQuery } from '../../.utils/gql/types/graphql'
import { GalleryHeader } from './galleryHeader';
import { GalleryRows } from './galleryRows';

type GalleryProps = {
  user: string,
  bio: string,
  contracts: CollectionInfoQuery[]
}

const GalleryWrapper = styled.div`
  height: 90%;
  border: 1px solid black;
  margin: 10px;
  background-color: #ebebeb;
  display: grid;
  grid-template-rows: 100px;
`

export const Gallery = ({user, bio, contracts} : GalleryProps) => {
  return (
    <GalleryWrapper>
      <GalleryHeader user={user} bio={bio}/>
      <GalleryRows contracts={contracts}/>
    </GalleryWrapper>
  )
}