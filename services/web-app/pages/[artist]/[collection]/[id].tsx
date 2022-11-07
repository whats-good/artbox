import type { NextPage } from 'next';
import { PageWrapper } from '../../../components/styled/pagewrapper';
import { TopBar } from '../../../components/topbar';
import { ArtistPageWrapper } from '../../../components/styled/artistpage'
import { BlueBar } from '../../../components/styled/artistpage';
import { ShortenedAddress } from '../../../components/shortenedaddress';
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths } from 'next';
import { getNftMetaData } from '../../../helpers/getNftMetaData';
import { useRouter } from 'next/router';

type Data = {
  image?: string,
  title?: string,
  description?: string,
  attributes?: string,
}

export const getStaticPaths : GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
}

export const getStaticProps : GetStaticProps<Data> = async ({params}) => {

  let collection;
  let id;
  let img;

  if (params) {
    id = params.id;
    collection = params.collection;
  }

  //Am doing this because context.query type is string || string[]
  if (typeof collection === 'string' && typeof id === 'string') {
    img = await getNftMetaData(collection, id);
  }
  return {
    props: {
      image: img?.imageURL,
      title: img?.metadata.name,
      description: img?.metadata.description,
      attributes: JSON.stringify(img?.attributes),
    },
  }
}

const IndividualPiece: NextPage = ({ image, title, description, attributes } : InferGetStaticPropsType<typeof getStaticProps>) => {

  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
      <h1>Data is loading....</h1>
      </>
    )
  }

  return (
    <PageWrapper>
      <TopBar />
      <ArtistPageWrapper>
        <BlueBar />
        <ShortenedAddress />
        <img src={image} style={{width: '500px', height: 'auto'}}></img>
        <p>Title: {title}</p>
        <p>Description: {description}</p>
        <p>Attributes: {attributes}</p>
      </ArtistPageWrapper>
    </PageWrapper>
  )
}

export default IndividualPiece;