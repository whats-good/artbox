import axios from 'axios';

type ParseImageGalleryInput = {
  token: {
    __typename?: 'Token';
    collectionName?: string | null;
    collectionAddress: string;
    description?: string | null;
    metadata?: any | null;
    tokenId: string;
    image?: {
        __typename?: 'TokenContentMedia';
        url?: string | null;
        mediaEncoding?: {
            __typename?: 'AudioEncodingTypes';
        } | {
            __typename?: 'ImageEncodingTypes';
            thumbnail?: string | null;
        } | {
            __typename: 'UnsupportedEncodingTypes';
            original: string;
        } | {
            __typename?: 'VideoEncodingTypes';
        } | null;
    } | null;
    tokenContract?: {
        __typename?: 'TokenContract';
        description?: string | null;
        name?: string | null;
        symbol?: string | null;
        totalSupply?: number | null;
        collectionAddress: string;
    } | null;
  }
}
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

export const parseImageGallery = async ({ token }: ParseImageGalleryInput) : Promise<ParseImageResult> => {

  //First, try the normal image
  try {
    if (token.image?.mediaEncoding?.__typename === "ImageEncodingTypes" && token.image?.mediaEncoding?.thumbnail) {
      if ((await axios.get(token.image.mediaEncoding.thumbnail)).status === 200) {
        return {
          __typename: "success",
          url: token.image.mediaEncoding.thumbnail,
        }
      }
    }
  } catch(e) {}

  //Next, try the raw image URL
  try {
    if (token.image?.mediaEncoding?.__typename === "UnsupportedEncodingTypes" && token.image.url) {
      if ((await axios.get(token.image.url)).status === 200) {
        return {
          __typename: "success",
          url: token.image.url
        }
      }
    }
  } catch(e) {}

  //Finally, Check if IPFS link, and parse it
  try {
    if (token.image?.url && token.image.url.slice(0, 7) === "ipfs://") {
      const parsedUrl = parseIpfs(token.image.url)
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