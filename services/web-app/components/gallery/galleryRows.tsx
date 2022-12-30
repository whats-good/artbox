import type { CollectionInfoQuery } from '../../.utils/gql/types/graphql'
import { GalleryRow } from './galleryRow';
import styled from 'styled-components'

type GalleryRowsProps = {
  contracts: CollectionInfoQuery[];
}

const GalleryRowsWrapper = styled.div`
  display: grid;
  overflow-y: scroll;
  border-top: 1px solid black;
`

export const GalleryRows = ({ contracts } : GalleryRowsProps) => {
  return (
    <GalleryRowsWrapper>
      {contracts.map((contract) => <GalleryRow key={contract.collections.nodes[0].address} contract={contract}></GalleryRow>)}
    </GalleryRowsWrapper>
  )
};
