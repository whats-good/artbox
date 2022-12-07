import type { NextPage } from "next";
import { GetStaticProps, InferGetStaticPropsType, GetStaticPaths, GetStaticPropsResult } from "next";
import { useRouter } from "next/router";
import { getNftMetaData, GetNftMetaDataError } from "../../../helpers";
import type { NftMetadata } from "@zoralabs/nft-metadata";
import {
  PageWrapper,
  TopBar,
  ArtistPageWrapper,
  BlueBar,
  ShortenedAddress,
} from "../../../components";

type StaticPropsData = {
  props: {
    image: string;
    title: string;
    description: string;
    attributes: string;
  }
};
type StaticPropsError = {
  props: {
    message: string;
  }
};

type ReturnStaticProps = StaticPropsData | StaticPropsError;
type ReturnData = GetNftMetaDataError | NftMetadata;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

  let img : ReturnData = {
    __typename: "GetNftMetaDataError",
    message: "There was an error getting image data"
  };
  let id;
  let collection;

  if (params) {
    id = params.id;
    collection = params.collection;
  }

  //Am doing this because context.query type is string || string[]
  if (typeof collection === "string" && typeof id === "string") {
    img = await getNftMetaData(collection, id);
  } else {
    img = {
      __typename: "GetNftMetaDataError",
      message: "Could not get Nft metadata"
    }
  }
  if (img.__typename !== "GetNftMetaDataError") {
    return {
      props: {
        image: img.imageURL,
        title: img.metadata.name,
        description: img.metadata.description,
        attributes: JSON.stringify(img.attributes)
      }
    }
  }
  return {
    props: {
      message: "Error in Getting Static Props",
    }
  }
};

const IndividualPiece: NextPage = ({
  image,
  title,
  description,
  attributes,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <h1>Data is loading....</h1>
      </>
    );
  }

  return (
    <PageWrapper>
      <TopBar />
      <ArtistPageWrapper>
        <BlueBar />
        <ShortenedAddress />
        <img src={image} style={{ width: "500px", height: "auto" }}></img>
        <p>Title: {title}</p>
        <p>Description: {description}</p>
        <p>Attributes: {attributes}</p>
      </ArtistPageWrapper>
    </PageWrapper>
  );
};

export default IndividualPiece;
