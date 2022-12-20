import styled from "styled-components";

export const GalleryWrapper = styled.div`
  height: 96%;
  border: 1px solid black;
  margin: 10px;
  background-color: #ebebeb;
  display: grid;
  grid-template-rows: 100px 500px 15px;
`;

export const GalleryUpperBar = styled.div``;

export const GalleryMiddle = styled.div`
  display: grid;
  grid-template-columns: 60% auto;
`;

export const GalleryFooter = styled.div`
  border-top: 1px solid black;
`;
