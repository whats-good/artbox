import { Network, Alchemy, Nft } from "alchemy-sdk";
import { InferGetServerSidePropsType, GetServerSidePropsResult } from 'next';
import { GetServerSideProps } from 'next';
import axios from 'axios';

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
    let nftHistory;
    //Then fetch NFT data from Alchemy
    const settings = {
      apiKey: process.env.ALCHEMY_API_KEY,
      network: Network.ETH_MAINNET,
    }

    const alchemy = new Alchemy(settings);

    const nftData = await axios.get(`https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.ALCHEMY_API_KEY}/getNFTSales?fromBlock=0&toBlock=latest&order=asc&contractAddress=${collection}&tokenId=${id}`);

    console.log(nftData.data);

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
  console.log(props);
  if (props.__typename === "Success") {
    return (
      <>
      </>
    )
  }
};

export default Token;

//Title
//Description
//Collection
//Metadata
//Current Owner
//Activity
//Contract Address
//Opensea Link
//Etherscan Link
//LooksRare Link