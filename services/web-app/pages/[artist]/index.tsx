import { NextPage } from "next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getArtistData } from '../../helpers/getartistdata';

type ArtistProps = {
  name?: string,
  desc?: string,
  contracts?: string[],
}

export const getServerSideProps : GetServerSideProps<ArtistProps> = async (context) => {

  const { artist } = context.query;

  const artistData = await getArtistData(artist);

  return {
    props: {
      name: artistData?.name,
      desc: artistData?.desc,
      contracts: artistData?.contracts,
    },
  }
}

const Artist: NextPage = ({ name, desc, contracts } : InferGetServerSidePropsType<typeof getServerSideProps>) => {

  return (
    <>
    <p>{name}</p>
    <p>{desc}</p>
    {contracts?.map((contract, index) => {
      return (
      <p>Contract # {index} --- {contract}</p>
      )
    })}
    </>
  )
}

export default Artist;