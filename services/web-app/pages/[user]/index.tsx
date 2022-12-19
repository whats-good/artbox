import { InferGetServerSidePropsType } from 'next';
import { GetServerSideProps } from 'next';
import client from '../../utils/apollo-client';
import type { CollectionInfoQuery } from '../../.utils/gql/types/graphql'
import { collectionInfo } from '../../querys';


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
          tokenAddress: {collectionAddresses: profile.collections[i]},
	        collectionAddress: {collectionAddresses: profile.collections[i]},
          aggregateStatAddress: {collectionAddresses: profile.collections[i]},
          ownerCountAddress: {collectionAddresses: profile.collections[i]},
        },
        query: collectionInfo,
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
  console.log('PROPS: ', props);

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
  //Number of Tokens X
  //Number of Holders X
  //Sales Volume X
  //Images for 9 of them

