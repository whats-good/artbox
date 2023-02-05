import { InferGetServerSidePropsType } from 'next';
import { GetServerSideProps } from 'next';
import { useAccount } from "wagmi";
import client from '../../utils/apollo-client';
import type { CollectionInfoQuery } from '../../.utils/zoraTypes/graphql'
import { collectionInfo } from '../../querys/zora';
import { userInfo } from '../../querys/internal';
import { PageWrapper, BlueBar, TopBar, Gallery, ConnectedAccount } from '../../components/'

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
    bio: string,
    userAddress: string,
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

  //Requesting User Info
  try {
    const { data } = await client.query({
      variables: {
        name: user,
      },
      query: userInfo,
    });

    //If request is not successful, return error
    if (data.user.__typename === "UnknownError" || data.user.__typename === "NotFoundError") {
      return {
        props: {
          __typename: "SSRError",
          message: "Error Fetching User",
          notFound: true
        }
      }
    }

    if (data.user.__typename === "QueryUserSuccess") {

      // Check if the object is not empty AKA there is a user
      if (data.user.data.address) {
        profile = {
          id: parseInt(data.user.data.id),
          username: data.user.data.username,
          bio: data.user.data.description ? data.user.data.description : '',
          collections: data.user.data.contracts.map(({contractAddress}) => contractAddress)
        }
        try {
          const contracts = [];
          for (let i = 0; i < profile.collections.length; i++) {
            const { data } = await client.query({
              variables: {
                tokenAddress: {collectionAddresses: [profile.collections[i]]},
                collectionAddress: {collectionAddresses: [profile.collections[i]]},
                aggregateStatAddress: {collectionAddresses: [profile.collections[i]]},
                ownerCountAddress: {collectionAddresses: [profile.collections[i]]},
              },
              context: {clientName: 'zora'},
              query: collectionInfo,
            });
            contracts.push(data);
          }
          return {
            props: {
              __typename: "Success",
              contracts: JSON.parse(JSON.stringify(contracts)),
              user: profile.username,
              bio: profile.bio,
              userAddress: data.user.data.address,
            }
          }
        } catch(e) {
          return {
            props: {
              __typename: "SSRError",
              message: "Failed to Fetch Collection data" + (JSON.parse(JSON.stringify(e))),
              notFound: true,
            }
          }
        }
      } else {
        //If user is not found, then return back to homepage
        return {
          props: {
            __typename: "SSRError",
            message: "User not found",
            notFound: true
          }
        }
      }
    }
  } catch(e) {
    console.log(e);
    return {
      props: {
        __typename: "SSRError",
        message: "There was an error fetching token Data: ", e,
        notFound: true
      }
    }
  }

  return {
    props: {
      __typename: "SSRError",
      message: "User not found",
      notFound: true
    }
  }
}

function User(props : InferGetServerSidePropsType<typeof getServerSideProps>){

  const { address, isConnecting, isConnected } = useAccount()

  if (props.__typename === "Success") {
    return (
      <>
        <TopBar />
        <PageWrapper>
          <BlueBar />
          <ConnectedAccount />
          <Gallery user={props.user} bio={props.bio} contracts={props.contracts} userAddress={props.userAddress}/>
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
