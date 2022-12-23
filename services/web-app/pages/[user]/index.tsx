import { InferGetServerSidePropsType } from 'next';
import { GetServerSideProps } from 'next';
import client from '../../utils/apollo-client';
import type { CollectionInfoQuery } from '../../.utils/gql/types/graphql'
import { collectionInfo } from '../../querys';
import { PageWrapper, BlueBar, TopBar, Gallery } from '../../components/'
import { useAccount } from 'wagmi'
import styled from 'styled-components';
import { shortenAddress } from '../../helpers/shortenAddress';

type Profile = {
  id: number,
  username: string,
  collections: string[],
  bio: string,
}

type SSRError = {
    __typename: "SSRError",
    message: string
}
type Success = {
    __typename: "Success",
    contracts: CollectionInfoQuery[],
    user: string,
    bio: string
}
type FetchContractsProps = SSRError | Success

export const getServerSideProps : GetServerSideProps<FetchContractsProps> = async (context) => {
  let user;
  let profile : Profile;

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
  //TODO: Check if User exists

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
          tokenAddress: {collectionAddresses: [profile.collections[i]]},
	        collectionAddress: {collectionAddresses: [profile.collections[i]]},
          aggregateStatAddress: {collectionAddresses: [profile.collections[i]]},
          ownerCountAddress: {collectionAddresses: [profile.collections[i]]},
        },
        query: collectionInfo,
      });
      contracts.push(data);
    }
    return {
      props: {
        __typename: "Success",
        contracts: JSON.parse(JSON.stringify(contracts)),
        user: profile.username,
        bio: profile.bio
      }
    }
  } catch(e) {
    return {
      props: {
        __typename: "SSRError",
        message: "Failed to Fetch Collection data", e,
        notFound: true,
      }
    }
  }
}

function User(props : InferGetServerSidePropsType<typeof getServerSideProps>){

  const { address, isConnecting, isDisconnected } = useAccount();

  if (props.__typename === "Success") {
    return (
      <>
        <TopBar />
        <PageWrapper>
          <BlueBar />
          <ConnectedAccount />
          <Gallery user={props.user} bio={props.bio} contracts={props.contracts}/>
        </PageWrapper>
      </>
    );
  } else {
    return (
      <>
        There was an error.
      </>
    )
  }
};

export default User;

const ConnectedAccountWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 10px;
`

const ConnectedAccount = () => {

  const { address, isConnecting, isDisconnected } = useAccount()

  if (address) {
    return (
      <ConnectedAccountWrapper>
      <p>{shortenAddress(address)}</p>
    </ConnectedAccountWrapper>
    )
  };
  return <ConnectedAccountWrapper />;
}