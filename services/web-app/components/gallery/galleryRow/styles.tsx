import styled from "styled-components";
import type { RowTopBarWrapperProps } from "./types";

export const RowTopBarWrapper = styled.div<RowTopBarWrapperProps>`
  height: 30px;
  margin-left: 5px;
  margin-right: 15px;
  background-color: #008080;
  border: 1px solid black;
  border-bottom: ${(props) => (props.expand ? "none" : "")};
  display: grid;
  grid-template-columns: 5% 22% 15% 15% 15% auto;
  align-content: center;
`;
export const CardsIconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-left: 2px;
  justify-content: flex-start;
`;
export const ExpandButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 2px;
  justify-content: flex-end;
`;
export const RowBottomWrapper = styled.div`
  min-height: 210px;
  margin: 5px 15px 5px 5px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;
export const GalleryRowItemBottomWrapper = styled.div`
  padding-left: 5px;
  align-content: center;
`;
export const ExpandRowBottomWrapper = styled.div`
  margin-left: 5px;
  margin-right: 15px;
  background-color: #008080;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;
export const PageButtonsWrapper = styled.div`
  display: flex;
  grid-template-columns: 1fr 1fr;
  margin-right: 15px;
  margin-left: 5px;
  height: max-content;
  justify-content: flex-end;
  padding: 3px;
  background-color: #008080;
`;
export const GalleryRowItemWrapper = styled.div`
  margin: 1px 2px;
  border: 1px solid black;
  height: max;
  background-color: #cdcdcd;
  &:hover {
    border: 3px solid #565656;
  }
`;
