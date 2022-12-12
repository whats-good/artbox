import { Network, Alchemy, Nft } from "alchemy-sdk";
import { InferGetServerSidePropsType, GetServerSidePropsResult } from 'next';
import { GetServerSideProps } from 'next';

type FetchError = {
    __typename: "FetchError",
    message: string,
}
type Success = {
    __typename: "Success",
    nft: Nft;
}

type FetchNftProps = FetchError | Success

export const getServerSideProps : GetServerSideProps<FetchNftProps> = async (context) => {

  let user, collection, id;

  //Checking if the url params correct
  if (context.params) {
    user = context.params.user
    collection = context.params.collection;
    id = context.params.id;
  }
  if (typeof user !== 'string' || typeof collection !== 'string' || typeof id !== 'string') {
    return {
      props: {
        __typename: "FetchError",
        message: "Unable to use URL parameters",
        notFound: true,
      }
    }
  }

  try {
    let nft: Nft;
    //TODO: Fetch if user 'owns' NFT or not from db
    const res = await fetch('http:localhost:3000/api/profile');
    const user = await res.json();

    //Then fetch NFT data from Alchemy
    const settings = {
      apiKey: process.env.ALCHEMY_API_KEY,
      network: Network.ETH_MAINNET,
    }

    const alchemy = new Alchemy(settings);

    nft = await alchemy.nft.getNftMetadata(collection, id)
    //Must stringify then parse the 'contracts' array https://github.com/vercel/next.js/discussions/11209#discussioncomment-35915
    return {
      props: {
        __typename: "Success",
        nft: JSON.parse(JSON.stringify(nft)),
      }
    }
  } catch(e) {
    console.log(e);
    return {
      props: {
        __typename: "FetchError",
        message: "There was an error fetching NFT Metadata: ", e,
        notFound: true
      }
    }
  }
}

function Token(props : InferGetServerSidePropsType<typeof getServerSideProps>){
  if (props.__typename === "FetchError") {
    return (
      <div>
      Error:
      {props.message}
      </div>
    )
  }
  return (
    <>
    <p>
      {props.nft.media[0].thumbnail}
    </p>
    </>
  );
};

export default Token;