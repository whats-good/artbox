import { InferGetServerSidePropsType, GetServerSidePropsResult } from 'next';
import { GetServerSideProps } from 'next';
import client from '../../../utils/apollo-client';
import { tokenInfo } from '../../../querys';
import type { TokenInfoQuery } from '../../../.utils/gql/types/graphql';

type FetchError = {
    __typename: "FetchError",
    message: string,
}
type Success = {
    __typename: "Success",
    token: TokenInfoQuery,
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
    const { data } = await client.query({
      variables: {
        token: {
          address: "0x49623cAEc21B1fF5D04d7Bf7B71531369a69bCe4",
          tokenId: "14"
        }
      },
      query: tokenInfo,
    });

    return {
      props: {
        __typename: "Success",
        token: data
      }
    }

  } catch(e) {
    console.log(e);
    return {
      props: {
        __typename: "FetchError",
        message: "There was an error fetching token Data: ", e,
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

//Title X
//Description X
//Collection X
//Metadata X
//Current Owner X
//Activity
//Contract Address X
//Opensea Link
//Etherscan Link
//LooksRare Link