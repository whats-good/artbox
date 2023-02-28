import { useState } from "react";
import { RowTopBar } from "./galleryRow/rowTop";
import { RowBottom } from "./galleryRow/rowBottom";
import { GalleryRowProps } from "./types";
import { GalleryRowWrapper } from "./styles";

export const GalleryRow = ({ contract }: GalleryRowProps) => {
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
  );
};
