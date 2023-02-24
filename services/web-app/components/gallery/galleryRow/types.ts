import { Dispatch, SetStateAction } from "react";

export type RowTopBarProps = {
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
  collection: string | null | undefined;
  items: number | null | undefined;
  holders: number;
  volume: {
    __typename?: "SalesVolume" | undefined;
    usdcPrice: number;
  };
};
export type RowTopBarWrapperProps = {
  expand: boolean;
};
export type AggregateStatProps = {
  label: string;
  stat: string;
  dollar?: boolean;
};
export type ExpandButtonProps = {
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
};
export type GalleryRowItemProps = {
  urls: string[];
  title: string;
  contract: string;
  user: string;
};
export type GalleryRowItemBottomProps = {
  title: string;
};
export type ExpandRowBottomProps = {
  contractAddress: string;
  page: string | null | undefined;
  count: number;
  hasNext?: boolean;
};
export type RowBottomProps = {
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
  tokens: {
    __typename?: "TokenWithMarketsSummaryConnection";
    nodes: Array<{
      __typename?: "TokenWithMarketsSummary";
      token: {
        __typename?: "Token";
        collectionName?: string | null;
        collectionAddress: string;
        description?: string | null;
        metadata?: any | null;
        tokenId: string;
        image?: {
          __typename?: "TokenContentMedia";
          url?: string | null;
          mediaEncoding?:
            | {
                __typename?: "AudioEncodingTypes";
              }
            | {
                __typename?: "ImageEncodingTypes";
                thumbnail?: string | null;
              }
            | {
                __typename: "UnsupportedEncodingTypes";
                original: string;
              }
            | {
                __typename?: "VideoEncodingTypes";
              }
            | null;
        } | null;
        tokenContract?: {
          __typename?: "TokenContract";
          description?: string | null;
          name?: string | null;
          symbol?: string | null;
          totalSupply?: number | null;
          collectionAddress: string;
        } | null;
      };
    }>;
    pageInfo: {
      __typename?: "PageInfo";
      hasNextPage: boolean;
      endCursor?: string | null;
    };
  };
};
