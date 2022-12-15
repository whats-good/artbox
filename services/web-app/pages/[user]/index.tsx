import { InferGetServerSidePropsType } from 'next';
import { GetServerSideProps } from 'next';
import client from '../../utils/apollo-client';
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
  console.log('COLLECTION QUERY: ', CollectionQuery);
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
  console.log(props);
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