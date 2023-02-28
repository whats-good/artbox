import styled from "styled-components";

export const SingleTokenViewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;
export const ImageColumnWrapper = styled.div`
  height: 75vh;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid black;
`;
export const ImageInfoWrapper = styled.div`
  width: 50%;
  padding: 0px 10px 10px;
`;
export const EventWrapper = styled.div`
  background-color: #cdcdcd;
  border-bottom: 1px solid black;
  display: grid;
  grid-template-columns: 12% 22% 23% 23% 20%;
`;
export const EventsListWrapper = styled.div`
  border: 1px solid black;
  height: 22vh;
  overflow-y: auto;
`;
