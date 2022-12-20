import styled from "styled-components";

export const GalleryImageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

export const GalleryImage = styled.div`
  display: grid;
  grid-template-rows: 80% 20%;
  border: 1px solid black;
`;

export const GalleryImageTop = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
`;

export const GalleryImg = styled.img`
  width: 100px;
  height: auto;
`;

export const GalleryImageBottom = styled.div`
  background-color: #cdcdcd;
  border-top: 1px solid black;
`;
