import type { TokenInfoQuery } from '../.utils/gql/types/graphql';
import axios from 'axios';

type ImageUrlSuccess = {
  __typename: "success";
  url: string;
}
type ImageUrlFailure = {
  __typename: "failed";
  message: string;
}
type ParseImageResult = ImageUrlSuccess | ImageUrlFailure;

const parseIpfs = (url : string) => {
  return "https://ipfs.io" + url.slice(6);
}

export const parseImageUrl = async ({ token } : TokenInfoQuery) : Promise<ParseImageResult> => {

  //First, try the normal image
  try {
    if (token?.token.image?.mediaEncoding?.__typename === "ImageEncodingTypes" && token?.token.image?.mediaEncoding?.large) {
      if ((await axios.get(token.token.image.mediaEncoding.large)).status === 200) {
        return {
          __typename: "success",
          url: token.token.image.mediaEncoding.large,
        }
      }
    }
  } catch(e) {}

  //Next, try the raw image URL
  try {
    if (token?.token.image?.mediaEncoding?.__typename === "UnsupportedEncodingTypes" && token.token.image.url) {
      if ((await axios.get(token.token.image.url)).status === 200) {
        return {
          __typename: "success",
          url: token.token.image.url
        }
      }
    }
  } catch(e) {}

  //Finally, Check if IPFS link, and parse it
  try {
    if (token?.token.image?.url && token.token.image.url.slice(0, 7) === "ipfs://") {
      const parsedUrl = parseIpfs(token.token.image.url)
      if ((await axios.get(parsedUrl)).status === 200) {
        return {
          __typename: "success",
          url: parsedUrl,
        }
      }
    }
  } catch(e) {}

  //Return failed message if none work
  return {
    __typename: "failed",
    message: "Not able to fetch Image URL",
  }
}