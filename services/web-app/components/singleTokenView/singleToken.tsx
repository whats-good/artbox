import styled from 'styled-components';
import { shortenAddress } from '../../helpers/shortenAddress';
import type { TokenInfoQuery, TokenAttribute, EventType, Chain } from '../../.utils/gql/types/graphql';

type ImageColumnProps = {
  url: string | null | undefined;
}
type ImageInfoPointProps = {
  label: string;
  info: string;
}
type MetaDataInfoPointProps = {
  label: string;
  metaData: TokenAttribute[] | undefined | null;
}
type SaleEventItemProps = {
  date: string;
  to: string;
  from: string;
  price: string;
  hash: string;
}
type TransferEventItemProps = {
  date: string;
  to: string;
  from: string;
  hash: string;
}
type MintEventItemProps = {
  date: string;
  price: string;
  hash: string;
  to: string;
}
type EventsListProps = {
  events: Array<{ __typename?: 'Event', eventType: EventType, transactionInfo: { __typename?: 'TransactionInfo', transactionHash?: string | null, blockTimestamp: any }, properties: { __typename?: 'ApprovalEvent' } | { __typename?: 'LilNounsAuctionEvent' } | { __typename: 'MintEvent', toAddress: string, price?: { __typename?: 'PriceAtTime', usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null } | null } | { __typename?: 'NounsAuctionEvent' } | { __typename?: 'Sale', saleContractAddress?: string | null, buyerAddress: string, saleType: string, sellerAddress: string, price?: { __typename?: 'PriceAtTime', usdcPrice?: { __typename?: 'CurrencyAmount', decimal: number } | null } | null, networkInfo: { __typename?: 'NetworkInfo', chain: Chain } } | { __typename?: 'SeaportEvent' } | { __typename: 'TransferEvent', fromAddress: string, toAddress: string } | { __typename?: 'V1MarketEvent' } | { __typename?: 'V1MediaEvent' } | { __typename?: 'V2AuctionEvent' } | { __typename?: 'V3AskEvent' } | { __typename?: 'V3ModuleManagerEvent' } | { __typename?: 'V3ReserveAuctionEvent' } }>
}

const EventsListWrapper = styled.div`
  border: 1px solid black;
  height: 22vh;
  overflow-y: auto;
`;
const SingleTokenViewWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;
const ImageColumnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75vh;
  border-right: 1px solid black;
  margin-bottom: 5vh;
`;
const ImageInfoWrapper = styled.div`
  height: 75vh;
  padding: 0px 10px 10px;
`;
const EventWrapper = styled.div`
  background-color: #CDCDCD;
  border-bottom: 1px solid black;
  display: grid;
  grid-template-columns: 12% 22% 23% 23% 20%;
`

export const SingleTokenView = ({ token } : TokenInfoQuery) => {
  return (
    <SingleTokenViewWrapper>
      <ImageColumn url={token?.token.image?.mediaEncoding?.__typename === "ImageEncodingTypes" ? token.token.image.mediaEncoding.large : ''}/>
      <ImageInfo token={token}/>
    </SingleTokenViewWrapper>
  )
}

const ImageColumn = ({ url }: ImageColumnProps) => {
  return (
    <ImageColumnWrapper>
      {url ? <img style={{width: 'auto', height: '70%', marginBottom: '40px'}} src={url}/> : <p>Sorry, this Image is not available</p>}
    </ImageColumnWrapper>
  )
}

const ImageInfo = ({ token } : TokenInfoQuery) => {
  return (
    <ImageInfoWrapper>
      <ImageInfoPoint label="Title" info={token?.token.name ? token?.token.name : 'N/A'}/>
      <ImageInfoPoint label="Description" info={token?.token.description ? token?.token.description : 'N/A'}/>
      <ImageInfoPoint label="Collection" info={token?.token.collectionName ? token?.token.collectionName : 'N/A'}/>
      <ImageInfoPoint label="Current Owner" info={token?.token.owner ? shortenAddress(token?.token.owner) : 'N/A'}/>
      <MetaDataInfoPoint label="MetaData" metaData={token?.token.attributes}/>
      {token?.events ? <EventsList events={token.events}/> : <></>}
    </ImageInfoWrapper>
  )
}

const ImageInfoPoint = ({ label, info }: ImageInfoPointProps) => {
  return (
    <p>
      <b>{label}</b>: {info}
    </p>
  )
}

const MetaDataInfoPoint = ({ label, metaData }: MetaDataInfoPointProps) => {
  if (metaData) {
    return (
      <>
        <b>{label}:</b><br></br>
        {metaData?.map((data) => {
          return (
            <div key={data.traitType}>
              <p><b>{data.traitType}:</b> {data.value}</p>
            </div>
          )
        })}
      </>
    )
  }
  return (
    <></>
  )
}

const EventsList = ({ events } : EventsListProps) => {
  return (
    <>
      <p>Activity:</p>
      <EventsListWrapper>
      {events.map((event) => {
        if (event.properties.__typename === "Sale") {
          return (
            <SaleEventItem
              key={event.transactionInfo.blockTimestamp}
              date={event.transactionInfo.blockTimestamp}
              to={event.properties.buyerAddress}
              from={event.properties.sellerAddress}
              price={event.properties.price?.usdcPrice ? event.properties.price?.usdcPrice.decimal.toFixed(0) : 'N/A'}
              hash={event.transactionInfo.transactionHash ? event.transactionInfo.transactionHash : 'N/A'}
            />
          )
        }
        if (event.properties.__typename === "TransferEvent") {
          return (
            <TransferEventItem
              key={event.transactionInfo.blockTimestamp}
              date={event.transactionInfo.blockTimestamp}
              to={event.properties.toAddress}
              from={event.properties.fromAddress}
              hash={event.transactionInfo.transactionHash ? event.transactionInfo.transactionHash : 'N/A'}
            />
          )
        }
        if (event.properties.__typename === "MintEvent") {
          return (
            <MintEventItem
              key={event.transactionInfo.blockTimestamp}
              date={event.transactionInfo.blockTimestamp}
              to={event.properties.toAddress}
              price={event.properties.price?.usdcPrice ? event.properties.price.usdcPrice.decimal.toFixed(0) : 'N/A'}
              hash={event.transactionInfo.transactionHash ? event.transactionInfo.transactionHash : 'N/A'}
            />
          )
        }
        return (
          <></>
        )
      })}
      </EventsListWrapper>
    </>
  )
}

const SaleEventItem = ({ date, to, from, price, hash } : SaleEventItemProps) => {
  return (
    <EventWrapper>
      <p><b>Sale</b> (${price})</p>
      <p>To: {shortenAddress(to)}</p>
      <p>From: {shortenAddress(from)}</p>
      <p>Hash: {shortenAddress(hash)}</p>
      <p>Date: {date.slice(0,9)}</p>
    </EventWrapper>
  )
}

const TransferEventItem = ({ date, to, from, hash } : TransferEventItemProps) => {
  return (
    <EventWrapper>
      <p><b>Transfer</b></p>
      <p>To: {shortenAddress(to)}</p>
      <p>From: {shortenAddress(from)}</p>
      <p>Hash: {shortenAddress(hash)}</p>
      <p>Date: {date.slice(0,9)}</p>
    </EventWrapper>
  )
}

const MintEventItem = ({ date, price, hash, to } : MintEventItemProps) => {
  return (
    <EventWrapper>
      <p><b>Mint</b></p>
      <p>To: {shortenAddress(to)}</p>
      <p>Price: ${price}</p>
      <p>Hash: {shortenAddress(hash)}</p>
      <p>Date: {date.slice(0,9)}</p>
    </EventWrapper>
  )
}