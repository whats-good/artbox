import type { NextPage } from 'next';
import { PageWrapper } from '../../../components/styled/pagewrapper';
import { TopBar } from '../../../components/topbar';
import { ArtistPageWrapper } from '../../../components/styled/artistpage'
import { BlueBar } from '../../../components/styled/artistpage';
import { ShortenedAddress } from '../../../components/shortenedaddress';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getNftMetaData } from '../../../helpers/getNftMetaData';

type Data = {
  image?: string,
}

export const getServerSideProps : GetServerSideProps<Data> = async (context) => {

  const { collection, id } = context.query;
  let img;

  // Am doing this because context.query type is string || string[]
  if (typeof collection === 'string' && typeof id === 'string') {
    img = await getNftMetaData(collection, id);
  }

  return {
    props: {
      image: img?.imageURL,
    },
  }
}

const IndividualPiece: NextPage = ({ image } : InferGetServerSidePropsType<typeof getServerSideProps>) => {

  return (
    <PageWrapper>
      <TopBar />
      <ArtistPageWrapper>
        <BlueBar />
        <ShortenedAddress />
        <img src={image}></img>
      </ArtistPageWrapper>
    </PageWrapper>
  )
}

export default IndividualPiece;