import { GalleryImageWrapper } from './styled/galleryimagewrapper';
import { useEffect, useState } from 'react';
import { useEthers } from "@usedapp/core";
import { getImageUrls } from '../helpers/getipfs';
import { tokenURIABI } from '../helpers/erc721';
import { uriABI } from '../helpers/erc1155';
import { GridItem } from './griditem';

type nftData = {
name: string;
url: string;
description: string;
}

interface fetchedNftData {
  results: nftData[];
  count: number;
}

export function GridDisplay({ contracts } : any) {
  const [urls, setUrls] = useState<fetchedNftData | undefined>();

  //This is the provider
  const { library } = useEthers();

  async function fetchNftData() {
    try {
      const nftData = await getImageUrls(contracts[0], tokenURIABI, library, 15)
      setUrls(nftData)
    } catch(err) {
      console.log(err)
      }
  }

  useEffect(() => {
    fetchNftData();
  }, [library]);

  return (
    <GalleryImageWrapper>
      { urls ? urls.results.map((url: nftData, index: number) => <GridItem key={index} imageDetails={url}/>) : <p>Sorry Nothing Here</p> }
    </GalleryImageWrapper>
  )
}