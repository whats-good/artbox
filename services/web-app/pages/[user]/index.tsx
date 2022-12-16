import { InferGetServerSidePropsType } from 'next';
import { GetServerSideProps } from 'next';
import client from '../../utils/apollo-client';
import type { CollectionInfoQuery } from '../../.utils/gql/types/graphql'
import { gql } from "@apollo/client";

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

  //Validate the URL parameter exists and is string
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

  //Finding user's 'liked' collections
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

  //For each collection, query the Zora API
  try {

    let contracts = [];

    for (let i = 0; i < profile.collections.length; i++) {
      const { data } = await client.query({
        variables: {
          address: {collectionAddresses: profile.collections[i]},
	        collectionAddress: {collectionAddresses: profile.collections[i]}
        },
        query:
          gql`
            query CollectionInfo($address: TokensQueryInput, $collectionAddress: CollectionsQueryInput) {
              collections(
                networks: [{network: ETHEREUM, chain: MAINNET}]
                pagination: {limit: 9}
                sort: {sortKey: CREATED, sortDirection: ASC}
                where: $collectionAddress
              ) {
                nodes {
                  address
                  name
                  symbol
                  totalSupply
                  description
                }
              }
              tokens(
                where: $address
                pagination: {limit: 9}
                networks: {network: ETHEREUM, chain: MAINNET}
                sort: {sortKey: TOKEN_ID, sortDirection: DESC}
              ) {
                nodes {
                  token {
                    metadata
                  }
                }
              }
            }
          `,
      });
      contracts.push(data);
    }
    console.log('CONTRACTS', contracts);
    return {
      props: {
        __typename: "Success",
        contracts: JSON.parse(JSON.stringify(contracts)),
      }
    }
  } catch(e) {
    console.log('E,', e);
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
  console.log(props.__typename === "Success");

  if (props.__typename === "Success") {

  }
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

