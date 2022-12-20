import { InferGetServerSidePropsType, GetServerSidePropsResult } from 'next';
import { GetServerSideProps } from 'next';
import client from '../../../utils/apollo-client';
import { tokenInfo } from '../../../querys';
import type { TokenInfoQuery } from '../../../.utils/gql/types/graphql';
import { PageWrapper, TopBar, SingleTokenView, BlueBar } from '../../../components';


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

  //Check if the user has 'liked' collection
  try {

  } catch(e) {
    console.log(e);
    return {
      props: {
        __typename: "FetchError",
        message: "There was an error fetching token Data: ", e,
      }
    }
  }

  try {
    const { data } = await client.query({
      variables: {
        token: {
          address: collection,
          tokenId: id
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
  console.log('PROPS: ', props);
  if (props.__typename === "Success") {
    return (
      <>
        <TopBar />
        <PageWrapper>
          <BlueBar />
          {/* Connected Address Here */} <div />
          {props.token.token ? <SingleTokenView token={props.token.token}/> : <p>There was an error.</p>}
        </PageWrapper>
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
//Activity X
//Contract Address X
//Opensea Link
//Etherscan Link
//LooksRare Link