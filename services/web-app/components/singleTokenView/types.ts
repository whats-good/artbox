import type { TokenAttribute } from "../../.utils/zoraTypes/graphql";
import { EventType, Chain } from "../../.utils/zoraTypes/graphql";

export type ImageColumnProps = {
  urls: string[];
};
export type ImageInfoPointProps = {
  label: string;
  info: string;
};
export type MetaDataInfoPointProps = {
  label: string;
  metaData: TokenAttribute[] | undefined | null;
};
export type SaleEventItemProps = {
  date: string;
  to: string;
  from: string;
  price: string;
  hash: string;
};
export type TransferEventItemProps = {
  date: string;
  to: string;
  from: string;
  hash: string;
};
export type MintEventItemProps = {
  date: string;
  price: string;
  hash: string;
  to: string;
};
export type EventsListProps = {
  events: Array<{
    __typename?: "Event";
    eventType: EventType;
    transactionInfo: {
      __typename?: "TransactionInfo";
      transactionHash?: string | null;
      blockTimestamp: any;
    };
    properties:
      | { __typename?: "ApprovalEvent" }
      | { __typename?: "LilNounsAuctionEvent" }
      | {
          __typename: "MintEvent";
          toAddress: string;
          price?: {
            __typename?: "PriceAtTime";
            usdcPrice?: {
              __typename?: "CurrencyAmount";
              decimal: number;
            } | null;
          } | null;
        }
      | { __typename?: "NounsAuctionEvent" }
      | {
          __typename?: "Sale";
          saleContractAddress?: string | null;
          buyerAddress: string;
          saleType: string;
          sellerAddress: string;
          price?: {
            __typename?: "PriceAtTime";
            usdcPrice?: {
              __typename?: "CurrencyAmount";
              decimal: number;
            } | null;
          } | null;
          networkInfo: { __typename?: "NetworkInfo"; chain: Chain };
        }
      | { __typename?: "SeaportEvent" }
      | { __typename: "TransferEvent"; fromAddress: string; toAddress: string }
      | { __typename?: "V1MarketEvent" }
      | { __typename?: "V1MediaEvent" }
      | { __typename?: "V2AuctionEvent" }
      | { __typename?: "V3AskEvent" }
      | { __typename?: "V3ModuleManagerEvent" }
      | { __typename?: "V3ReserveAuctionEvent" };
  }>;
};
