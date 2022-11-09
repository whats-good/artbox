import { NextPage, GetServerSidePropsContext } from "next";
import {
  PageWrapper,
  TopBar,
  ArtistPageWrapper,
  BlueBar,
  ShortenedAddress,
  ArtistGallery,
} from "../../../components";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  BulkNftMetaData,
  getBulkNftMetaData,
} from "../../../helpers/getNftMetaData";
import { getArtistData } from "../../../helpers/getartistdata";

interface ReturnServerSideProps {
  props: {
    __typename: "ReturnServerSideProps";
    meta: BulkNftMetaData;
    name: string;
    desc: string;
  };
}
interface ReturnServerSidePropsError {
  props: {
    __typename: "ReturnServerSidePropsError";
    message: string;
  };
}

export const getServerSideProps:
  | ReturnServerSideProps
  | ReturnServerSidePropsError = async (context: GetServerSidePropsContext) => {
  let { collection, id } = context.query;

  if (typeof collection !== "string" || typeof id !== "string") {
    return {
      props: {
        __typename: "ReturnServerSidePropsError",
        message: "The URL params were not currectly formatted.",
      },
    };
  }

  const userData = await getArtistData(id);
  const data = await getBulkNftMetaData(collection);

  if (data.__typename === "BulkNftMetaDataError") {
    return {
      props: {
        __typename: "ReturnServerSidePropsError",
        message: "There was an error in getBulkNftMetaDataError function.",
      },
    };
  }
  if (userData.__typename === "INotFoundError") {
    return {
      props: {
        __typename: "ReturnServerSidePropsError",
        message: "There was an error in getArtistData function",
      },
    };
  } else if (userData.__typename === "IError") {
    return {
      props: {
        __typename: "ReturnServerSidePropsError",
        message: "There was an error in getArtistData function",
      },
    };
  }

  return {
    props: {
      __typename: "ReturnServerSideProps",
      meta: data,
      name: userData.name,
      desc: userData.desc,
    },
  };
};

const Collection: NextPage<props> = (props) => {
  return (
    <PageWrapper>
      <TopBar />
      <ArtistPageWrapper>
        <BlueBar />
        <ShortenedAddress />
        <ArtistGallery meta={props.meta} desc={props.desc} name={props.name} />
      </ArtistPageWrapper>
    </PageWrapper>
  );
};

export default Collection;
