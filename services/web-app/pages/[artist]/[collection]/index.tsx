import { NextPage } from "next";
import { PageWrapper } from "../../../components/styled/pagewrapper";
import { TopBar } from "../../../components/topbar";
import { ArtistPageWrapper } from "../../../components/styled/artistpage";
import { BlueBar } from "../../../components/styled/artistpage";
import { ShortenedAddress } from "../../../components/shortenedaddress";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  BulkNftMetaData,
  getBulkNftMetaData,
} from "../../../helpers/getNftMetaData";
import { ArtistGallery } from "../../../components/artistgallery";
import { getArtistData } from "../../../helpers/getartistdata";

// type MetaData = {
//   meta: BulkNftMetaData | undefined,
// }

export const getServerSideProps: GetServerSideProps<any> = async (context) => {
  let { collection, id } = context.query;
  let data;
  let userData;

  if (typeof collection === "string") {
    data = await getBulkNftMetaData(collection);
  } else if (Array.isArray(collection)) {
    data = await getBulkNftMetaData(collection[0]);
  }
  if (typeof id === "string") {
    userData = await getArtistData(id);
  }

  return {
    props: {
      meta: data,
      name: userData.name,
      desc: userData.desc,
    },
  };
};

const Collection: NextPage = ({
  meta,
  name,
  desc,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <PageWrapper>
      <TopBar />
      <ArtistPageWrapper>
        <BlueBar />
        <ShortenedAddress />
        <ArtistGallery meta={meta} desc={desc} name={name} />
      </ArtistPageWrapper>
    </PageWrapper>
  );
};

export default Collection;
