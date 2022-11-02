import type { NextPage } from 'next';
import { PageWrapper } from '../../../components/styled/pagewrapper';
import { useRouter } from 'next/router';
import { TopBar } from '../../../components/topbar';
import { ArtistPageWrapper } from '../../../components/styled/artistpage'
import { BlueBar } from '../../../components/styled/artistpage';
import { ShortenedAddress } from '../../../components/shortenedaddress';
import Image from 'next/image';
import { Agent } from '@zoralabs/nft-metadata';
import { useEffect, useState } from 'react';


const parser = new Agent({
  network: 'homestead',
  networkUrl: 'https://web3-trial.cloudflare-eth.com/v1/mainnet',
  timeout: 60 * 1000,
})

const IndividualPiece: NextPage = () => {
  const router = useRouter();
  const { artist, collection, id } = router.query;
  const [img, setimg] = useState<string | undefined>();

  useEffect(() => {
    const getMeta = async () => {
      if (artist && collection && id && typeof collection === 'string') {
        parser.fetchMetadata(collection, id.toString()).then((data) => {
          setimg(data.imageURL);
        })
      }
    }
    getMeta();
  }, [artist, collection, id])
  console.log('STATE: ', img);
  return (
    <PageWrapper>
      <TopBar />
      <ArtistPageWrapper>
        <BlueBar />
        <ShortenedAddress />
        {typeof img === 'string' ? <img src={img}></img> : <></>}
      </ArtistPageWrapper>
    </PageWrapper>
  )
}

export default IndividualPiece;