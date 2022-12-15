import { Network, Alchemy, NftContractNftsResponse } from "alchemy-sdk";
import { InferGetServerSidePropsType } from 'next';
import { GetServerSideProps } from 'next';
import client from '../../utils/apollo-client';
import { gql } from "@apollo/client";
import { CollectionQuery } from '../../components/queries/querys'
import type { CollectionInfoQuery } from '../../.utils/gql/types/graphql'

type SSRError = {
    __typename: "SSRError",
    message: string
}
type Success = {
    __typename: "Success",
    contracts: CollectionInfoQuery[];
}

type FetchContractsProps = SSRError | Success

export const getServerSideProps : GetServerSideProps<FetchContractsProps> = async (context) => {

  let user;
  let profile;

  if (context.params) {
    user = context.params.user
  }
  if (typeof user !== 'string') {
    return {
      props: {
        __typename: "SSRError",
        message: "Url Parameter not formatted properly",
        notFound: true,
      }
    }
  }

  //Finding 'liked' collections in the DB of profile
  try {
    const res = await fetch('http:localhost:3000/api/profile');
    profile = await res.json();
  } catch(e) {
    console.log(e);
    return {
      props: {
        __typename: "SSRError",
        message: "Could not fetch collections",
        notFound: true,
      }
    }
  }

  try {

    let contracts = [];

    for (let i = 0; i < profile.collections.length; i++) {
      const { data } = await client.query({
        query: CollectionQuery,
      });
      contracts.push(data);
    }
    return {
      props: {
        __typename: "Success",
        contracts: JSON.parse(JSON.stringify(contracts)),
      }
    }
  } catch(e) {
    return {
      props: {
        __typename: "SSRError",
        message: "Failed to Fetch Collection data",
        notFound: true,
      }
    }
  }
}

function User(props : InferGetServerSidePropsType<typeof getServerSideProps>){
  console.log(props)

  return (
    <>
    </>
  );
};

export default User;


//NEED:
  //Contract Etherscan Link
  //Contract OS Link
  //Contract Looksrare Link
  //Number of Tokens
  //Number of Holders
  //Sales Volume