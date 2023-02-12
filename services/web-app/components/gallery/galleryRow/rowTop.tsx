import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import Image from "next/image";
import cardImage from "../../../assets/cardFile.svg";
import { ButtonInner, ButtonOuter } from "../../button";

//Types

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
type RowTopBarWrapperProps = {
  expand: boolean
}
type AggregateStatProps = {
  label: string;
  stat: string;
  dollar?: boolean;
}
type ExpandButtonProps = {
  expand: boolean;
  setExpand: Dispatch<SetStateAction<boolean>>;
}

//Styles

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
`;
const CardsIconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 2px;
  justify-content: flex-start;
`;
const ExpandButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 2px;
  justify-content: flex-end;
`;

//Components

const CardsIcon = () => {
  return (
    <CardsIconWrapper>
      <Image src={cardImage} alt="card-icon"/>
    </CardsIconWrapper>
  )
}

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
          {expand ? "Collapse" : "Expand"}
        </ButtonInner>
      </ButtonOuter>
    </ExpandButtonWrapper>
  )
}

export const RowTopBar = ({ collection, items, holders, volume, expand, setExpand } : RowTopBarProps) => {
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