import { GetServerSidePropsContext, NextPage } from "next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getArtistData } from "../../helpers/getartistdata";

/**
 * RULE 1: Build from the bottom up.
 *
 * Bottom -> the lowest, sensible, self-contained piece of logic.
 *
 * Example: A function, a component, or a library.
 *
 * It is the external world that has to adapt to the unit.
 *
 * The unit, should not be broken just so it adapts to the rest of the world.
 */

/**
 * Rule 2: When working with types, always favor required types.
 *
 * Nullability, and undefined are not there to make your life is easier,
 * (when abused they will make your life harder)
 *
 * They are there, to describe the nature of the object.
 */

/**
 * Rule 3: If a field is an array, there's in general no reason to make it nullable.
 *
 */

/**
 * Rule 4: Do not throw an error or an exception, unless it's truly an exception: It's
 * something you totally did not expect in your code flow.
 */

/**
 * Rule 5: When using union types, it's almost always better to have a shared string literal field that differs in value.
 *
 * You can then use that shared field to differentiate the types at runtime.
 */

/**
 * Rule 6: Always do your best, to return out of undesired corner cases as soon as possible
 */

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { artist } = context.query;

  if (typeof artist !== "string") {
    // the query param for "artist" was not a string
    return {
      props: {
        __typename: "MalformedQueryParamsError" as const,
      },
    };
  }

  const artistData = await getArtistData(artist);

  return {
    props: artistData,
  };
};

const Artist: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  if (props.__typename === "MalformedQueryParamsError") {
    return <div>Something is wrong with your URL</div>;
  } else if (props.__typename === "INotFoundError") {
    return <div>It wasn't found!</div>;
  } else if (props.__typename === "IError") {
    return <div>{props.message}</div>;
  }

  return (
    <>
      <p>{props.name}</p>
      <p>{props.desc}</p>
      {props.contracts?.map((contract, index) => {
        return (
          <p>
            Contract # {index} --- {contract}
          </p>
        );
      })}
    </>
  );
};

export default Artist;
