import { InferGetServerSidePropsType } from 'next';
import { GetServerSideProps } from 'next';
import client from '../../utils/apollo-client';
import type { CollectionInfoQuery } from '../../.utils/zoraTypes/graphql'
import { collectionInfo } from '../../querys/zora';
import { userInfo } from '../../querys/internal';
import { PageWrapper, BlueBar, TopBar, Gallery, ConnectedAccount } from '../../components/'
import { ethers } from 'ethers';
import { useMutation } from "@apollo/client";
import { useSignMessage, useAccount } from 'wagmi';
import { createUser } from '../../querys/internal/createUser';
import { useState } from 'react';

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
              bio: profile.bio
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

  if (props.__typename === "Success") {
    return (
      <>
        {/* <Sign /> */}
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


// function Sign() {

//   const digest = ethers.utils.arrayify(ethers.utils.hashMessage("gm wagmi frens"));

//   const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
//     message: 'hello sam',
//   })

//   return (
//     <div>
//       <button disabled={isLoading} onClick={() => signMessage()}>
//         Sign message
//       </button>
//       <SendMut signature={data}/>
//       {isError && <div>Error signing message</div>}
//     </div>
//   )
// }

// type SendMutProps = {
//   signature: `0x${string}` | undefined;
// }

// const SendMut = ({ signature } : SendMutProps) => {

//   //Add connected Wallet
//   const { address, isConnecting, isDisconnected } = useAccount();

//   const [createUserFunction, { data, loading, error }] = useMutation(createUser);

//     return (
//       <>
//       <button onClick={(e) => {
//         e.preventDefault();
//         createUserFunction({
//           variables: {
//             newUserDetails: {
//               address: address as string,
//               username: "sam2"
//             }
//           },
//           context: {
//             headers: {
//               "x-ethereum-signature": ( signature ? signature : '' )
//             }
//           },
//           notifyOnNetworkStatusChange: true,
//         })
//       }}>Send Mutation</button>
//       </>
//     )
// }
