import styled from 'styled-components';
import type { TokenInfoQuery } from '../../.utils/gql/types/graphql';

type ImageColumnProps = {
  url: string | null | undefined;
}


const SingleTokenViewWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`;

const ImageColumnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75vh;
  border-right: 1px solid black;
  margin-bottom: 5vh;
`;

export const SingleTokenView = ({ token } : TokenInfoQuery) => {

  return (
    <SingleTokenViewWrapper>
      <ImageColumn url={token?.token.image?.mediaEncoding?.__typename === "ImageEncodingTypes" ? token.token.image.mediaEncoding.large : ''}/>
      <ImageInfo />
    </SingleTokenViewWrapper>
  )
}

const ImageColumn = ({ url }: ImageColumnProps) => {
  return (
    <ImageColumnWrapper>
      {url ? <img style={{width: 'auto', height: '70%', marginBottom: '40px'}} src={url}/> : <p>Sorry, this Image is not available</p>}
    </ImageColumnWrapper>
  )
}

const ImageInfo = () => {
  return (
    <>
    </>
  )
}