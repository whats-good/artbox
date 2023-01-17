import { useState } from "react";
import styled from "styled-components"
import type { CollectionInfoQuery } from '../../.utils/gql/types/graphql'
import { RowTopBar } from "./galleryRow/rowTop";
import { RowBottom } from "./galleryRow/rowBottom";

//Types

type GalleryRowProps = {
  contract: CollectionInfoQuery
}

//Styles

const GalleryRowWrapper = styled.div`
  margin: 15px 0px;
`

//Components

export const GalleryRow = ({ contract } : GalleryRowProps) => {

  const [expand, setExpand] = useState(false);

  return (
    <GalleryRowWrapper>
      <RowTopBar
        collection={contract.tokens.nodes[0].token.collectionName}
        items={contract.collections.nodes[0].totalSupply}
        holders={contract.aggregateStat.ownerCount}
        volume={contract.aggregateStat.salesVolume}
        expand={expand}
        setExpand={setExpand}
      />
      <RowBottom
        tokens={contract.tokens}
        expand={expand}
        setExpand={setExpand}
      />
    </GalleryRowWrapper>
  )
}