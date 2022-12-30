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

  const checkObj = {
    properImage: true,
    ipfsParse: true,
    wrongImage: true,
  }

  //TRY NORMALLY
  try {
    if (token?.token.image?.mediaEncoding?.__typename === "ImageEncodingTypes" && token?.token.image?.mediaEncoding?.large) {
      if ((await axios.get(token.token.image.mediaEncoding.large)).status === 200) {
        return {
        __typename: "success",
        url: token.token.image.mediaEncoding.large,
        }
      }
    }
  } catch(e) {
    checkObj.properImage = false;
  }

  //TRY UNSUPPORTED TYPE
  try {
    if (token?.token.image?.mediaEncoding?.__typename === "UnsupportedEncodingTypes" && token.token.image.url) {
      if ((await axios.get(token.token.image.url)).status === 200) {
        return {
          __typename: "success",
          url: token.token.image.url
        }
      }
    }
  } catch(e) {
    checkObj.wrongImage = false;
  }

  //TRY PARSING WITH IPFS
  try {
    if (token?.token.image?.url && token.token.image.url.slice(0, 7) === "ipfs://") {
      const parsedUrl = parseIpfs(token.token.image.url)
      if ((await axios.get(parsedUrl)).status === 200) {
        return {
          __typename: "success",
          url: parsedUrl,
        }
      } else {
        return {
          __typename: "failed",
          message: "Not working"
        }
      }
    }
  } catch(e) {
    checkObj.ipfsParse = false;
    return {
      __typename: "failed",
      message: "Unable to fetch"
    }
  }

  return {
    __typename: "failed",
    message: "This failed for unknown reasons."
  }
}

//ipfs://ipfs/QmTD6JkRDPCsEDz6ze4XGvAoGx9aURvF1JWLNnm66xUJAE/image.png