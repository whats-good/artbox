// import { NextPage } from "next";
import { Network, Alchemy, NftContractNftsResponse } from "alchemy-sdk";
import { InferGetServerSidePropsType } from 'next';
import { GetServerSideProps } from 'next';

type FetchError = {
    __typename: "FetchError",
    message: string
}
type Success = {
    __typename: "Success",
    contracts: NftContractNftsResponse[];
}

type FetchContractsProps = FetchError | Success


export const getServerSideProps : GetServerSideProps<FetchContractsProps> = async () => {
  try {
    let contracts: NftContractNftsResponse[] = [];
    //Fetch User info from DB
    const res = await fetch('http:localhost:3000/api/profile');
    const user = await res.json();

    console.log('USER: ', user);
    //Then fetch NFT data from Alchemy
    const settings = {
      apiKey: process.env.ALCHEMY_API_KEY,
      network: Network.ETH_MAINNET,
    }

    const alchemy = new Alchemy(settings);

    //Fetch each NFT Data for each collection
    for (let i = 0; i < user.collections.length; i++) {
      contracts.push(await alchemy.nft.getNftsForContract(user.collections[i], { pageSize: 9 }))
    }
    console.log('-------------------CONTRACTS----------------------', contracts);
    return {
      props: {
        __typename: "Success",
        contracts: contracts,
      }
    }
  } catch(e) {
    console.log(e);
    return {
      props: {
        __typename: "FetchError",
        message: "There was an error fetching from the API"
      }
    }
  }
}

function User(props : InferGetServerSidePropsType<typeof getServerSideProps>){
  if (props.__typename === "FetchError") {
    return (
      <>
      Error:
      {props.message}
      </>
    )
  }
  return (
    <>
    {props.contracts.map((contract) => {
      return (
        <>
        {contract.pageKey}
        </>
      )
    })}
    </>
  );
};

export default User;