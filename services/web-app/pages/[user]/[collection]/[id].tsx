import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import client from "../../../utils/apollo-client";
import { tokenInfo } from "../../../querys/zora";
import type { TokenInfoQuery } from "../../../.utils/zoraTypes/graphql";
import { PageWrapper, SingleTokenView } from "../../../components";

type Success = {
  token: TokenInfoQuery;
};

export const getServerSideProps: GetServerSideProps<Success> = async (
  context
) => {
  let user, collection, id;

  //Checks if the url params correct
  if (context.params) {
    user = context.params.user;
    collection = context.params.collection;
    id = context.params.id;
  }
  if (
    typeof user !== "string" ||
    typeof collection !== "string" ||
    typeof id !== "string"
  ) {
    return {
      notFound: true,
    };
  }

  try {
    //TODO: Check if the user has 'liked' collection
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
