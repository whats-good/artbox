import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import client from "../../utils/apollo-client";
import type { CollectionInfoQuery } from "../../.utils/zoraTypes/graphql";
import { collectionInfo } from "../../querys/zora";
import { userInfo } from "../../querys/internal";
import { PageWrapper, Gallery } from "../../components/";

type Profile = {
  id: number;
  username: string;
  collections: string[];
  bio: string;
};
type Success = {
  contracts: CollectionInfoQuery[];
  user: string;
  bio: string;
  userAddress: string;
};

export const getServerSideProps: GetServerSideProps<Success> = async (
  context
) => {
  let user;
  let profile: Profile;

  //Validate the URL parameter exists and is string
  if (context.params) {
    user = context.params.user;
  }
  if (typeof user !== "string") {
    return {
      notFound: true,
    };
  }

  try {
    const { data } = await client.query({
      variables: {
        name: user,
      },
      query: userInfo,
      fetchPolicy: "no-cache",
    });

    //Confirm query is successful
    if (data.user.__typename !== "QueryUserSuccess") {
      return {
        notFound: true,
      };
    }
    // Check if the object is not empty AKA there is a user
    if (data.user.data.address) {
      profile = {
        id: parseInt(data.user.data.id),
        username: data.user.data.username,
        bio: data.user.data.description ? data.user.data.description : "",
        collections: data.user.data.contracts.map(
          ({ contractAddress }) => contractAddress
        ),
      };
      //For each 'liked' contract, query the Zora API
      try {
        const contracts = [];
        for (let i = 0; i < profile.collections.length; i++) {
          const { data } = await client.query({
            variables: {
              tokenAddress: { collectionAddresses: [profile.collections[i]] },
              collectionAddress: {
                collectionAddresses: [profile.collections[i]],
              },
              aggregateStatAddress: {
                collectionAddresses: [profile.collections[i]],
              },
              ownerCountAddress: {
                collectionAddresses: [profile.collections[i]],
              },
            },
            context: { clientName: "zora" },
            query: collectionInfo,
          });
          contracts.push(data);
        }
        return {
          props: {
            contracts: JSON.parse(JSON.stringify(contracts)),
            user: profile.username,
            bio: profile.bio,
            userAddress: data.user.data.address,
          },
        };
      } catch (e) {
        return {
          notFound: true,
        };
      }
    } else {
      return {
        notFound: true,
      };
    }
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

function User(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PageWrapper>
      <Gallery
        user={props.user}
        bio={props.bio}
        contracts={props.contracts}
        userAddress={props.userAddress}
      />
    </PageWrapper>
  );
}
export default User;
