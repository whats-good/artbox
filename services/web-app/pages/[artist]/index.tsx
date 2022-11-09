import { GetServerSidePropsContext, NextPage } from "next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ShortenedAddress } from "../../components/addressdisplay/shortenedaddress";
import {
  ArtistPageWrapper,
  BlueBar,
} from "../../components/pagewrapper/artistpage";
import { PageWrapper } from "../../components/pagewrapper/pagewrapper";
import { TopBar } from "../../components/connectwallet/topbar";
import { getArtistData } from "../../helpers/getartistdata";
import { ContractTiles } from "../../components/contractTiles";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { artist } = context.query;

  if (typeof artist !== "string") {
    // the query param for "artist" was not a string
    return {
      props: {
        __typename: "MalformedQueryParamsError" as const,
      },
    };
  }

  const artistData = await getArtistData(artist);

  return {
    props: artistData,
  };
};

const Artist: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  if (props.__typename === "MalformedQueryParamsError") {
    return <div>Something is wrong with your URL</div>;
  } else if (props.__typename === "INotFoundError") {
    return <div>It wasn't found!</div>;
  } else if (props.__typename === "IError") {
    return <div>{props.message}</div>;
  }

  return (
    <PageWrapper>
      <TopBar />
      <ArtistPageWrapper>
        <BlueBar />
        <ShortenedAddress />
        <ContractTiles
          name={props.name}
          desc={props.desc}
          con={props.contracts}
        />
      </ArtistPageWrapper>
    </PageWrapper>
  );
};

export default Artist;
