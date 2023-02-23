import styled from "styled-components";

export const ArtistBioModalInsideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;
export const ReadBioWrapper = styled.div`
  background-color: #ebebeb;
  border: 1px solid black;
  padding: 3px;
  height: 100%;
`;
export const GalleryWrapper = styled.div`
  height: 93%;
  border: 1px solid black;
  margin: 10px;
  background-color: #ebebeb;
  display: grid;
  grid-template-rows: 100px;
`;
export const GalleryHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;
export const HeaderAndBioWrapper = styled.div`
  padding-left: 10px;
`;
export const ArtistInfoButtonWrapper = styled.div`
  display: flex;
  padding: 3px;
  justify-content: flex-end;
  height: min-content;
  align-items: center;
`;
export const ArtistInfoText = styled.p`
  margin: 0px 10px 0px 0px;
`;
export const ModalAnchor = styled.div`
  height: 1px;
`;
export const GalleryRowWrapper = styled.div`
  margin: 15px 0px;
`;
export const GalleryRowsWrapper = styled.div`
  display: grid;
  overflow-y: scroll;
  border-top: 1px solid black;
`;
