import Image from "next/image";
import cardImage from "../../../assets/cardFile.svg";
import { ButtonInner, ButtonOuter } from "../../button";
import {
  CardsIconWrapper,
  ExpandButtonWrapper,
  RowTopBarWrapper,
} from "./styles";
import type {
  AggregateStatProps,
  ExpandButtonProps,
  RowTopBarProps,
} from "./types";

const CardsIcon = () => {
  return (
    <CardsIconWrapper>
      <Image src={cardImage} alt="card-icon" />
    </CardsIconWrapper>
  );
};

const AggregateStat = ({ label, stat, dollar }: AggregateStatProps) => {
  return (
    <p>
      {label} : {dollar ? `$${stat}` : stat}
    </p>
  );
};

const ExpandButton = ({ expand, setExpand }: ExpandButtonProps) => {
  return (
    <ExpandButtonWrapper>
      <ButtonOuter>
        <ButtonInner onClick={() => setExpand(!expand)}>
          {expand ? "Collapse" : "Expand"}
        </ButtonInner>
      </ButtonOuter>
    </ExpandButtonWrapper>
  );
};

export const RowTopBar = ({
  collection,
  items,
  holders,
  volume,
  expand,
  setExpand,
}: RowTopBarProps) => {
  return (
    <RowTopBarWrapper expand={expand}>
      <CardsIcon />
      <AggregateStat
        label="Collection"
        stat={collection ? collection : "N/A"}
      />
      <AggregateStat label="Items" stat={items ? items.toString() : "N/A"} />
      <AggregateStat label="Holders" stat={holders.toString()} />
      <AggregateStat
        label="volume"
        stat={volume.usdcPrice.toFixed(0)}
        dollar={true}
      />
      <ExpandButton expand={expand} setExpand={setExpand} />
    </RowTopBarWrapper>
  );
};
