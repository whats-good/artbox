import { NextPage } from "next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getArtistData } from '../../helpers/getartistdata';
import { PageWrapper } from '../../components/styled/pagewrapper';
import { TopBar } from '../../components/topbar';
import { ArtistPageWrapper } from '../../components/styled/artistpage';
import { ContractTiles } from '../../components/contractTiles/contractTile';
import { BlueBar } from '../../components/styled/artistpage';
import { ShortenedAddress } from '../../components/shortenedaddress';

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
    <PageWrapper>
      <TopBar />
      <ArtistPageWrapper>
        <BlueBar />
        <ShortenedAddress />
        <ContractTiles con={contracts} name={name} desc={desc}/>
      </ArtistPageWrapper>
    </PageWrapper>

  )
}

export default Artist;