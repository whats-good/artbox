import styled from "styled-components";
import LoadingGif from "../../assets/QR8-loading-large.gif";
import Image from "next/image";

const GalleryItemLoadingWrapper = styled.div`
  margin: auto;
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;
export const PageLoading = () => {
  return (
    <GalleryItemLoadingWrapper>
      <Image width="200" src={LoadingGif} alt="Loading-Icon" />
    </GalleryItemLoadingWrapper>
  );
};
