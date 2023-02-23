import LoadingGif from "../../assets/QR8-loading-large.gif";
import Image from "next/image";
import { GalleryItemLoadingWrapper } from "./styles";

export const PageLoading = () => {
  return (
    <GalleryItemLoadingWrapper>
      <Image width="200" src={LoadingGif} alt="Loading-Icon" />
    </GalleryItemLoadingWrapper>
  );
};
