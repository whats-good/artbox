import { useState, Dispatch, SetStateAction, useEffect } from 'react';
import type { TokenGalleryQuery, CollectionInfoQuery } from '../../.utils/gql/types/graphql'
import { useQuery } from '@apollo/client';
import { tokenGallery } from '../../querys';
import styled from 'styled-components'
import cardImage from '../../assets/cardFile.svg';
import Image from 'next/image';
import { ButtonInner, ButtonOuter } from '../button';

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
  }
}
type GalleryRowItemProps = {
  url: string;
  title: string
}

const GalleryRowWrapper = styled.div`
  min-height: 240px;
`
const RowTopBarWrapper = styled.div`
  height: 12%;
  margin-left: 5px;
  margin-right: 15px;
  background-color: #008080;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 5% 32% 13% 15% 15% auto;
  align-content: center;
`
const RowBottomWrapper = styled.div`
  margin: 5px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  height: 80%;
`
const GalleryRowItemWrapper = styled.div`
  margin: 0px 2px;
  border: 1px solid black;
  height: max;
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
  background-color: #008080;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`

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
    <RowTopBarWrapper>
      <CardsIcon />
      <AggregateStat label="Collection Name" stat={collection ? collection : 'N/A'}/>
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

type StateProps = Array<{
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
} | {
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
          size?: string | null;
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
  };
}> | any

const RowBottom = ({ tokens, expand, setExpand } : RowBottomProps) => {

  const [firstPage, setFirstPage] = useState(tokens.pageInfo.endCursor);
  const [firstNodes, setFirstNodes] = useState(tokens.nodes);
  const [currentPage, setCurrentPage] = useState(tokens.pageInfo.endCursor);
  const [collection] = useState(tokens.nodes[0].token.collectionAddress);
  const [nodes, setNodes] = useState<StateProps>(tokens.nodes);

  //
  if (expand) {
    //Check if it is not the last page
    return (
      <ExpandRowBottom
        contractAddress={collection}
        page={firstPage}
        count={27}
      />
    )
  }
  return (
    <RowBottomWrapper>
      {firstNodes.map((token) => {
        return (
          <GalleryRowItem
            url={token.token.image?.url ? token.token.image?.url : ''}
            title={token.token.tokenId}
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

const GalleryRowItem = ({ url, title } : GalleryRowItemProps) => {
  return (
    <GalleryRowItemWrapper>
      <img style={{width: "100%", height: "75%", objectFit: "cover", borderBottom: "1px solid black"}} src={url}/>
      <GalleryRowItemBottom title={title}/>
    </GalleryRowItemWrapper>
  )
}

type ExpandRowBottomProps = {
  contractAddress: string;
  page: string | null | undefined;
  count: number;
  hasNext?: boolean;
}

const ExpandRowBottom = ({ contractAddress, page, count = 27, hasNext} : ExpandRowBottomProps ) => {

  const { loading, error, data, refetch, networkStatus } = useQuery(
    tokenGallery,
    {
      variables: {
        tokenAddress: {collectionAddresses: [contractAddress]},
        page: {limit: count, after: page}
      },
    }
  );

  useEffect(() => {

  }, [loading])

  if (loading) return (
    <p>Loading....</p>
  );
  if (error) return (
    <p>Error</p>
  );

  console.log('DATA: ', data);
  return (
    <ExpandRowBottomWrapper>
      {data?.tokens.nodes.map((token) => {
        console.log('TOKEN', token);
        return (
          <GalleryRowItem
            url={token.token.image?.url ? token.token.image?.url : ''}
            title={token.token.tokenId}
          />
        )
      })}
    </ExpandRowBottomWrapper>
  )
}