import { useState, Dispatch, SetStateAction } from 'react';
import type { CollectionInfoQuery } from '../../.utils/gql/types/graphql'
import { useQuery } from '@apollo/client';
import { tokenGallery } from '../../querys';
import styled from 'styled-components'
import cardImage from '../../assets/cardFile.svg';
import Image from 'next/image';
import { ButtonInner, ButtonOuter } from '../button';
import Link from 'next/link';
import { useRouter } from 'next/router'

type GalleryRowProps = {
  contract: CollectionInfoQuery
}
type GalleryRowItemBottomProps = {
  title: string
}
type ExpandButtonProps = {
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
}
type RowTopBarProps = {
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
  collection: string | null | undefined;
  items: number | null | undefined;
  holders: number;
  volume: {
    __typename?: "SalesVolume" | undefined;
    usdcPrice: number;
  };
}
type AggregateStatProps = {
  label: string;
  stat: string;
  dollar?: boolean;
}
type RowBottomProps = {
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
  tokens: {
    __typename?: 'TokenWithMarketsSummaryConnection';
    nodes: Array<{
        __typename?: 'TokenWithMarketsSummary';
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
                    __typename?: 'UnsupportedEncodingTypes';
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
        };
    }>;
    pageInfo: {
        __typename?: 'PageInfo';
        hasNextPage: boolean;
        endCursor?: string | null;
    };
  };
}
type GalleryRowItemProps = {
  url: string;
  title: string;
  contract: string;
  user: string;
}
type ExpandRowBottomProps = {
  contractAddress: string;
  page: string | null | undefined;
  count: number;
  hasNext?: boolean;
}
type RowTopBarWrapperProps = {
  expand: boolean
}


const GalleryRowWrapper = styled.div`
`

const RowTopBarWrapper = styled.div<RowTopBarWrapperProps>`
  height: 30px;
  margin-left: 5px;
  margin-right: 15px;
  background-color: #008080;
  border: 1px solid black;
  border-bottom: ${props => props.expand ? 'none' : ''};
  display: grid;
  grid-template-columns: 5% 22% 15% 15% 15% auto;
  align-content: center;
`
const RowBottomWrapper = styled.div`
  min-height: 210px;
  margin: 5px 15px 5px 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  height: 80%;
`
const GalleryRowItemWrapper = styled.div`
  margin: 1px 2px;
  border: 1px solid black;
  height: max;
  background-color: #CDCDCD;
  &:hover {
    border: 3px solid #565656;
  }
`
const GalleryRowItemBottomWrapper = styled.div`
  padding-left: 5px;
  align-content: center;
`
const ExpandButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 2px;
  justify-content: flex-end;
`
const CardsIconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 2px;
  justify-content: flex-start;
`
const ExpandRowBottomWrapper = styled.div`
  margin-left: 5px;
  margin-right: 15px;
  background-color: #008080;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`
const PageButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 20px;
`;

export const GalleryRow = ({ contract } : GalleryRowProps) => {

  const [expand, setExpand] = useState(false);

  return (
    <GalleryRowWrapper>
      <RowTopBar
        collection={contract.tokens.nodes[0].token.collectionName}
        items={contract.collections.nodes[0].totalSupply}
        holders={contract.aggregateStat.ownerCount}
        volume={contract.aggregateStat.salesVolume}
        expand={expand}
        setExpand={setExpand}
      />
      <RowBottom
        tokens={contract.tokens}
        expand={expand}
        setExpand={setExpand}
      />
    </GalleryRowWrapper>
  )
}

const CardsIcon = () => {
  return (
    <CardsIconWrapper>
      <Image src={cardImage} alt="card-icon"/>
    </CardsIconWrapper>
  )
}

const RowTopBar = ({ collection, items, holders, volume, expand, setExpand } : RowTopBarProps) => {
  return (
    <RowTopBarWrapper expand={expand}>
      <CardsIcon />
      <AggregateStat label="Collection" stat={collection ? collection : 'N/A'}/>
      <AggregateStat label="Items" stat={items ? items.toString() : 'N/A'}/>
      <AggregateStat label="Holders" stat={holders.toString()}/>
      <AggregateStat label="volume" stat={volume.usdcPrice.toFixed(0)} dollar={true}/>
      <ExpandButton expand={expand} setExpand={setExpand}/>
    </RowTopBarWrapper>
  )
};

const AggregateStat = ({ label, stat, dollar } : AggregateStatProps) => {
  return (
    <p>
      {label} : {dollar ? `$${stat}` : stat}
    </p>
  )
}

const ExpandButton = ({ expand, setExpand } : ExpandButtonProps) => {
  return (
    <ExpandButtonWrapper>
      <ButtonOuter>
        <ButtonInner onClick={() => setExpand(!expand)}>
          Expand
        </ButtonInner>
      </ButtonOuter>
    </ExpandButtonWrapper>
  )
}

const RowBottom = ({ tokens, expand, setExpand } : RowBottomProps) => {
  const router = useRouter();
  if (expand) {
    return (
      <ExpandRowBottom
        contractAddress={tokens.nodes[0].token.collectionAddress}
        page={tokens.pageInfo.endCursor}
        count={27}
      />
    )
  }
  return (
    <RowBottomWrapper>
      {tokens.nodes.map((token) => {
        return (
          <GalleryRowItem
            key={token.token.tokenId}
            contract={token.token.collectionAddress}
            url={
              token.token.image?.mediaEncoding?.__typename === "ImageEncodingTypes" &&
              typeof token.token.image.mediaEncoding.thumbnail === "string"
            ? token.token.image.mediaEncoding.thumbnail : ''}
            title={token.token.tokenId}
            user={router.asPath}
          />
        )
      })}
    </RowBottomWrapper>
  )
}

const GalleryRowItemBottom = ({title} : GalleryRowItemBottomProps) => {
  return (
    <GalleryRowItemBottomWrapper>
      <p>{title}</p>
    </GalleryRowItemBottomWrapper>
  )
}

const GalleryRowItem = ({ url, title, contract, user } : GalleryRowItemProps) => {
  return (
    <GalleryRowItemWrapper>
      <Link href={`${user}/${contract}/${title}`}>
        <img style={{width: "100%", height: "75%", objectFit: "cover", borderBottom: "1px solid black"}} src={url}/>
      </Link>
      <GalleryRowItemBottom title={title}/>
    </GalleryRowItemWrapper>
  )
}

const ExpandRowBottom = ({ contractAddress, page, count = 27, hasNext} : ExpandRowBottomProps ) => {

  const router = useRouter();

  const [previousPage, setPreviousPage] = useState(page);
  const [currentPage, setCurrentPage] = useState(page);
  const { loading, error, data, refetch, networkStatus } = useQuery(
    tokenGallery,
    {
      variables: {
        tokenAddress: {collectionAddresses: [contractAddress]},
        page: {limit: count, after: page}
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  if (loading) return (
    <p>Loading....</p>
  );
  if (error) return (
    <p>Error</p>
  );
  return (
    <ExpandRowBottomWrapper>
      {data?.tokens.nodes.map((token) => {
        return (
          <GalleryRowItem
            key={token.token.tokenId}
            url={token.token.image?.mediaEncoding?.__typename === "ImageEncodingTypes" && typeof token.token.image.mediaEncoding.thumbnail === "string" ? token.token.image.mediaEncoding.thumbnail : ''}
            title={token.token.tokenId}
            user={router.asPath}
            contract={token.token.collectionAddress}
          />
        )
      })}
      <PageButtonsWrapper>
        {previousPage !== page ?
          <ButtonOuter>
            <ButtonInner
              onClick={() => {
                setPreviousPage(data?.tokens.pageInfo.endCursor)
                refetch({
                  tokenAddress: {collectionAddresses: [contractAddress]},
                  page: {limit: 27, after: previousPage}
                })
              }}>
              {'<<'}
            </ButtonInner>
          </ButtonOuter>
        : <></>}
        <ButtonOuter>
          <ButtonInner
            onClick={() => {
              setPreviousPage(data?.tokens.pageInfo.endCursor)
              refetch({
                tokenAddress: {collectionAddresses: [contractAddress]},
                page: {limit: 27, after: data?.tokens.pageInfo.endCursor}
              })
            }}>
            {'>>'}
          </ButtonInner>
        </ButtonOuter>
      </PageButtonsWrapper>
    </ExpandRowBottomWrapper>
  )
}