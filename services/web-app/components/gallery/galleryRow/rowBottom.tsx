import { useRouter } from "next/router";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { tokenGallery } from "../../../querys/zora";
import { ButtonInner, ButtonOuter } from "../../button";
import { parseIpfs } from "../../../helpers";
import Image from "next/image";

//Types

type GalleryRowItemProps = {
  urls: string[];
  title: string;
  contract: string;
  user: string;
};
type GalleryRowItemBottomProps = {
  title: string;
};
type ExpandRowBottomProps = {
  contractAddress: string;
  page: string | null | undefined;
  count: number;
  hasNext?: boolean;
};
type RowBottomProps = {
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

//Styles

const RowBottomWrapper = styled.div`
  min-height: 210px;
  margin: 5px 15px 5px 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;
const GalleryRowItemBottomWrapper = styled.div`
  padding-left: 5px;
  align-content: center;
`;
const ExpandRowBottomWrapper = styled.div`
  margin-left: 5px;
  margin-right: 15px;
  background-color: #008080;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;
const PageButtonsWrapper = styled.div`
  display: flex;
  grid-template-columns: 1fr 1fr;
  margin-right: 15px;
  margin-left: 5px;
  height: max-content;
  justify-content: flex-end;
  padding: 3px;
  background-color: #008080;
`;
const GalleryRowItemWrapper = styled.div`
  margin: 1px 2px;
  border: 1px solid black;
  height: max;
  background-color: #cdcdcd;
  &:hover {
    border: 3px solid #565656;
  }
`;

//Components

const ExpandRowBottom = ({
  contractAddress,
  page,
  count = 27,
  hasNext,
}: ExpandRowBottomProps) => {
  const router = useRouter();

  const [previousPage, setPreviousPage] = useState(page);
  const [currentPage, setCurrentPage] = useState(page);
  const { loading, error, data, refetch, networkStatus } = useQuery(
    tokenGallery,
    {
      variables: {
        tokenAddress: { collectionAddresses: [contractAddress] },
        page: { limit: count, after: page },
      },
      context: { clientName: "zora" },
      notifyOnNetworkStatusChange: true,
    }
  );

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error</p>;
  return (
    <>
      <ExpandRowBottomWrapper>
        {data?.tokens.nodes.map((token) => {
          const urls: string[] = [];

          if (
            token.token.image?.mediaEncoding?.__typename ===
              "ImageEncodingTypes" &&
            token.token.image?.mediaEncoding?.thumbnail
          ) {
            urls.push(token.token.image.mediaEncoding.thumbnail);
          }
          if (
            token.token.image?.mediaEncoding?.__typename ===
              "UnsupportedEncodingTypes" &&
            token.token.image.url
          ) {
            urls.push(token.token.image.url);
          }
          if (
            token.token.image?.url &&
            token.token.image.url.slice(0, 7) === "ipfs://"
          ) {
            urls.push(parseIpfs(token.token.image.url));
          }
          urls.push("");

          return (
            <GalleryRowItem
              key={token.token.tokenId}
              urls={urls}
              title={token.token.tokenId}
              user={router.asPath}
              contract={token.token.collectionAddress}
            />
          );
        })}
      </ExpandRowBottomWrapper>
      <PageButtonsWrapper>
        {previousPage !== page ? (
          <ButtonOuter>
            <ButtonInner
              onClick={() => {
                setPreviousPage(data?.tokens.pageInfo.endCursor);
                refetch({
                  tokenAddress: { collectionAddresses: [contractAddress] },
                  page: { limit: 27, after: previousPage },
                });
              }}
            >
              {"<<"}
            </ButtonInner>
          </ButtonOuter>
        ) : (
          <></>
        )}
        <ButtonOuter>
          <ButtonInner
            onClick={() => {
              setPreviousPage(data?.tokens.pageInfo.endCursor);
              refetch({
                tokenAddress: { collectionAddresses: [contractAddress] },
                page: { limit: 27, after: data?.tokens.pageInfo.endCursor },
              });
            }}
          >
            {">>"}
          </ButtonInner>
        </ButtonOuter>
      </PageButtonsWrapper>
    </>
  );
};
const GalleryRowItemBottom = ({ title }: GalleryRowItemBottomProps) => {
  return (
    <GalleryRowItemBottomWrapper>
      <p>{title}</p>
    </GalleryRowItemBottomWrapper>
  );
};
const GalleryRowItem = ({
  urls,
  title,
  contract,
  user,
}: GalleryRowItemProps) => {
  const [i, increment] = useState<number>(0);
  const [src, setSrc] = useState<string>(urls[i]);

  return (
    <GalleryRowItemWrapper>
      <Link href={`${user}/${contract}/${title}`}>
        <img
          alt={title}
          style={{
            width: "100%",
            height: "75%",
            objectFit: "cover",
            borderBottom: "1px solid black",
          }}
          src={src}
          onError={() => {
            if (i !== urls.length - 1) {
              setSrc(urls[i]);
              increment(i + 1);
            }
          }}
        />
      </Link>
      <GalleryRowItemBottom title={title} />
    </GalleryRowItemWrapper>
  );
};
export const RowBottom = ({ tokens, expand, setExpand }: RowBottomProps) => {
  const router = useRouter();
  if (expand) {
    return (
      <ExpandRowBottom
        contractAddress={tokens.nodes[0].token.collectionAddress}
        page={tokens.pageInfo.endCursor}
        count={27}
      />
    );
  }
  return (
    <RowBottomWrapper>
      {tokens.nodes.map((token) => {
        const urls: string[] = [];

        if (
          token.token.image?.mediaEncoding?.__typename ===
            "ImageEncodingTypes" &&
          token.token.image?.mediaEncoding?.thumbnail
        ) {
          urls.push(token.token.image.mediaEncoding.thumbnail);
        }
        if (
          token.token.image?.mediaEncoding?.__typename ===
            "UnsupportedEncodingTypes" &&
          token.token.image.url
        ) {
          urls.push(token.token.image.url);
        }
        if (
          token.token.image?.url &&
          token.token.image.url.slice(0, 7) === "ipfs://"
        ) {
          urls.push(parseIpfs(token.token.image.url));
        }
        urls.push("");

        return (
          <GalleryRowItem
            key={token.token.tokenId}
            contract={token.token.collectionAddress}
            urls={urls}
            title={token.token.tokenId}
            user={router.asPath}
          />
        );
      })}
    </RowBottomWrapper>
  );
};
