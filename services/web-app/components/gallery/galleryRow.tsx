import type { CollectionInfoQuery } from '../../.utils/gql/types/graphql'
import styled from 'styled-components'
import cardImage from '../../assets/cardFile.svg';
import Image from 'next/image';
import { ButtonInner, ButtonOuter } from '../button'

type GalleryRowProps = {
  contract: CollectionInfoQuery
}
type GalleryRowItemBottomProps = {
  title: string
}

type RowTopBarProps = {
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
  height: 240px;
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

export const GalleryRow = ({ contract } : GalleryRowProps) => {
  return (
    <GalleryRowWrapper>
      <RowTopBar
        collection={contract.tokens.nodes[0].token.collectionName}
        items={contract.collections.nodes[0].totalSupply}
        holders={contract.aggregateStat.ownerCount}
        volume={contract.aggregateStat.salesVolume}
      />
      <RowBottom tokens={contract.tokens} />
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

const RowTopBar = ({ collection, items, holders, volume } : RowTopBarProps) => {
  return (
    <RowTopBarWrapper>
      <CardsIcon />
      <AggregateStat label="Collection Name" stat={collection ? collection : 'N/A'}/>
      <AggregateStat label="Items" stat={items ? items.toString() : 'N/A'}/>
      <AggregateStat label="Holders" stat={holders.toString()}/>
      <AggregateStat label="volume" stat={volume.usdcPrice.toFixed(0)} dollar={true}/>
      <ExpandButton />
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

const ExpandButton = () => {
  return (
    <ExpandButtonWrapper>
      <ButtonOuter>
        <ButtonInner>
          Expand
        </ButtonInner>
      </ButtonOuter>
    </ExpandButtonWrapper>
  )
}

const RowBottom = ({ tokens } : RowBottomProps) => {
  return (
    <RowBottomWrapper>
      {tokens.nodes.map((token) => {
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