import type { CollectionInfoQuery } from '../../.utils/gql/types/graphql'
import styled from 'styled-components'
import cardImage from '../../assets/cardFile.svg';
import Image from 'next/image';
import { ContractTileStyled } from '../contractTiles/styled';
import { getNftMetaData } from '../../helpers/getNftMetaData';

type GalleryRowProps = {
  contract: CollectionInfoQuery
}
type GalleryImageProps = {
  url: string
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
`

const GalleryImage = styled.div<GalleryImageProps>`
background-image: url(${props => props.url})
width: 50px;
height: 50px;
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
      <RowBottom tokens={contract.tokens}/>
    </GalleryRowWrapper>
  )
}

const RowTopBar = ({ collection, items, holders, volume } : RowTopBarProps) => {
  return (
    <RowTopBarWrapper>
      <Image style={{ marginTop: '14px' }}src={cardImage} alt="card-icon"/>
      <AggregateStat label="Collection Name" stat={collection ? collection : 'N/A'}/>
      <AggregateStat label="Items" stat={items ? items.toString() : 'N/A'}/>
      <AggregateStat label="Holders" stat={holders.toString()}/>
      <AggregateStat label="volume" stat={volume.usdcPrice.toFixed(0)} dollar={true}/>
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

const GalleryRowItemWrapper = styled.div`
  margin: 0px 2px;
  border: 1px solid black;
`

const GalleryRowItem = ({ url, title } : GalleryRowItemProps) => {
  return (
    <GalleryRowItemWrapper>
      {/* <GalleryImage url={url}/> */}
      <img style={{width: "100%", height: "100%", objectFit: "cover"}} src={url}/>
    </GalleryRowItemWrapper>
  )
}