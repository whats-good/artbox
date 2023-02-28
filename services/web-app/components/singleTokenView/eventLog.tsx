import { shortenAddress } from "../../helpers/shortenAddress";
import type {
  SaleEventItemProps,
  TransferEventItemProps,
  MintEventItemProps,
  EventsListProps,
} from "./types";
import { EventWrapper, EventsListWrapper } from "./styles";

const SaleEventItem = ({ date, to, from, price, hash }: SaleEventItemProps) => {
  return (
    <EventWrapper>
      <p>
        <b>Sale</b> (${price})
      </p>
      <p>To: {shortenAddress(to)}</p>
      <p>From: {shortenAddress(from)}</p>
      <p>Hash: {shortenAddress(hash)}</p>
      <p>Date: {date.slice(0, 9)}</p>
    </EventWrapper>
  );
};
const TransferEventItem = ({
  date,
  to,
  from,
  hash,
}: TransferEventItemProps) => {
  return (
    <EventWrapper>
      <p>
        <b>Transfer</b>
      </p>
      <p>To: {shortenAddress(to)}</p>
      <p>From: {shortenAddress(from)}</p>
      <p>Hash: {shortenAddress(hash)}</p>
      <p>Date: {date.slice(0, 9)}</p>
    </EventWrapper>
  );
};
const MintEventItem = ({ date, price, hash, to }: MintEventItemProps) => {
  return (
    <EventWrapper>
      <p>
        <b>Mint</b>
      </p>
      <p>To: {shortenAddress(to)}</p>
      <p>Price: ${price}</p>
      <p>Hash: {shortenAddress(hash)}</p>
      <p>Date: {date.slice(0, 9)}</p>
    </EventWrapper>
  );
};

//Full event log that conditionally displays event type components
export const EventsList = ({ events }: EventsListProps) => {
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
                price={
                  event.properties.price?.usdcPrice
                    ? event.properties.price?.usdcPrice.decimal.toFixed(0)
                    : "N/A"
                }
                hash={
                  event.transactionInfo.transactionHash
                    ? event.transactionInfo.transactionHash
                    : "N/A"
                }
              />
            );
          }
          if (event.properties.__typename === "TransferEvent") {
            return (
              <TransferEventItem
                key={event.transactionInfo.blockTimestamp}
                date={event.transactionInfo.blockTimestamp}
                to={event.properties.toAddress}
                from={event.properties.fromAddress}
                hash={
                  event.transactionInfo.transactionHash
                    ? event.transactionInfo.transactionHash
                    : "N/A"
                }
              />
            );
          }
          if (event.properties.__typename === "MintEvent") {
            return (
              <MintEventItem
                key={event.transactionInfo.blockTimestamp}
                date={event.transactionInfo.blockTimestamp}
                to={event.properties.toAddress}
                price={
                  event.properties.price?.usdcPrice
                    ? event.properties.price.usdcPrice.decimal.toFixed(0)
                    : "N/A"
                }
                hash={
                  event.transactionInfo.transactionHash
                    ? event.transactionInfo.transactionHash
                    : "N/A"
                }
              />
            );
          }
          return <></>;
        })}
      </EventsListWrapper>
    </>
  );
};
