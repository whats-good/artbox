import { GalleryImageWrapper } from "./styled/galleryimagewrapper";
import { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { getImageUrls } from "../helpers/getipfs";
import { tokenURIABI } from "../helpers/erc721";
import { uriABI } from "../helpers/erc1155";
import { GridItem } from "./griditem";
import { getBulkNftMetaData } from "../helpers/getNftMetaData";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { BulkNftMetaData } from "../helpers/getNftMetaData";

type MetaData = {
  contracts: BulkNftMetaData;
};

export function GridDisplay({ meta }: any) {
  return (
    <GalleryImageWrapper>
      {meta.results.map((url: any) => (
        <GridItem imageDetails={url} />
      ))}
    </GalleryImageWrapper>
  );
}
