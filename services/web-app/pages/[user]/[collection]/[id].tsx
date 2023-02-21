import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import client from "../../../utils/apollo-client";
import { tokenInfo } from "../../../querys/zora";
import { userInfo } from "../../../querys/internal";
import type { TokenInfoQuery } from "../../../.utils/zoraTypes/graphql";
import { PageWrapper, SingleTokenView } from "../../../components";

type Success = {
  token: TokenInfoQuery;
};

export const getServerSideProps: GetServerSideProps<Success> = async (
  context
) => {
  let user: string;
  let collection: string;
  let id: string;

  //Checks if the url params correct
  if (
    context.params &&
    typeof context.params.user === "string" &&
    typeof context.params.collection === "string" &&
    typeof context.params.id === "string"
  ) {
    user = context.params.user;
    collection = context.params.collection;
    id = context.params.id;
  } else {
    return {
      notFound: true,
    };
  }

  //Check if user has 'liked' collection, if not, 404
  try {
    const { data } = await client.query({
      variables: {
        name: user,
      },
      query: userInfo,
    });

    if (data.user.__typename === "QueryUserSuccess") {
      if (
        !data.user.data.contracts
          .map((c) => c.contractAddress.toUpperCase())
          .includes(collection.toUpperCase())
      ) {
        return {
          notFound: true,
        };
      }
    }
  } catch (e) {
    return {
      notFound: true,
    };
  }

  try {
    const { data } = await client.query({
      variables: {
        token: {
          address: collection,
          tokenId: id,
        },
      },
      context: { clientName: "zora" },
      query: tokenInfo,
    });
    return {
      props: {
        token: data,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

function Token(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <PageWrapper>
      {props.token.token ? (
        <SingleTokenView token={props.token.token} />
      ) : (
        <p>There was an error.</p>
      )}
    </PageWrapper>
  );
}

export default Token;
