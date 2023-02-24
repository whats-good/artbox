import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { tokenGallery } from "../../../querys/zora";
import { ButtonInner, ButtonOuter } from "../../button";
import { parseIpfs } from "../../../helpers";
import type {
  ExpandRowBottomProps,
  GalleryRowItemBottomProps,
  GalleryRowItemProps,
  RowBottomProps,
} from "./types";
import {
  ExpandRowBottomWrapper,
  PageButtonsWrapper,
  GalleryRowItemBottomWrapper,
  RowBottomWrapper,
  GalleryRowItemWrapper,
} from "./styles";

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
