interface ArtistData {
  __typename: "ArtistData";
  id: string;
  name: string;
  desc: string;
  wallet: string;
  contracts: string[];
}

interface IError {
  __typename: "IError";
  message: string;
}

interface INotFoundError {
  __typename: "INotFoundError";
  objectId: string;
}

export type GetArtistDataReturnType = ArtistData | INotFoundError | IError;

/**
 * Note: Ts trick: When using union types,
 */

// Temporary to mimic backend response
export async function getArtistData(
  id: string
): Promise<GetArtistDataReturnType> {
  // const a = await fetch("....");
  // do something with "a"

  // process "a"

  // and determine if the data is structured the way we expect it to be.

  // figure out a way to handle unexpected situations.

  // Question: what do we do when the server returns null?

  let proper = true;
  if (!proper) {
    let found = true;
    // if (not found)
    if (!found) {
      return {
        __typename: "INotFoundError",
        objectId: id,
      };
    }
    return {
      __typename: "IError",
      message: "something went wrong",
    };
  }
  return {
    __typename: "ArtistData",
    id,
    name: "Logan Larkin",
    desc: "This is my cool art collection, check it out!",
    wallet: "0x5D0f971BCDd15A222A7776d0171225ccfE5EEadE",
    contracts: [
      "0x49623cAEc21B1fF5D04d7Bf7B71531369a69bCe4",
      "0x7D70D50A8E9D1B4F04F5a2fA2e46078DA9EBB467",
    ],
  };
}
