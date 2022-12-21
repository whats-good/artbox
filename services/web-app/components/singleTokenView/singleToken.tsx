import styled from 'styled-components';
import type { TokenInfoQuery, TokenAttribute } from '../../.utils/gql/types/graphql';

type ImageColumnProps = {
  url: string | null | undefined;
}
type ImageInfoPointProps = {
  label: string;
  info: string;
}
type MetaDataInfoPointProps = {
  label: string;
  metaData: TokenAttribute[] | undefined | null;
}

const EventsListWrapper = styled.div`
  border: 1px solid black;
  height: 22vh;
`;
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
const ImageInfoWrapper = styled.div`
  height: 75vh;
  padding: 0px 10px 10px;
`;

export const SingleTokenView = ({ token } : TokenInfoQuery) => {
  console.log('TOKEN: ', token);
  return (
    <SingleTokenViewWrapper>
      <ImageColumn url={token?.token.image?.mediaEncoding?.__typename === "ImageEncodingTypes" ? token.token.image.mediaEncoding.large : ''}/>
      <ImageInfo token={token}/>
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

const ImageInfo = ({ token } : TokenInfoQuery) => {
  return (
    <ImageInfoWrapper>
      <ImageInfoPoint label="Title" info={token?.token.name ? token?.token.name : 'N/A'}/>
      <ImageInfoPoint label="Description" info={token?.token.description ? token?.token.description : 'N/A'}/>
      <ImageInfoPoint label="Collection" info={token?.token.collectionName ? token?.token.collectionName : 'N/A'}/>
      <ImageInfoPoint label="Current Owner" info={token?.token.owner ? token?.token.owner : 'N/A'}/>
      <MetaDataInfoPoint label="MetaData" metaData={token?.token.attributes}/>
      <EventsList />
    </ImageInfoWrapper>
  )
}

const ImageInfoPoint = ({ label, info }: ImageInfoPointProps) => {
  return (
    <p>
      <b>{label}</b>: {info}
    </p>
  )
}

const MetaDataInfoPoint = ({ label, metaData }: MetaDataInfoPointProps) => {
  if (metaData) {
    return (
      <>
        <b>{label}:</b><br></br>
        {metaData?.map((data) => {
          return (
            <>
            <p><b>{data.traitType}:</b> {data.value}</p>
            </>
          )
        })}
      </>
    )
  }
  return (
    <></>
  )
}

const EventsList = () => {
  return (
    <>
      <p>Activity:</p>
      <EventsListWrapper>

      </EventsListWrapper>
    </>
  )
}

const EventItem = () => {
  return (
    <></>
  )
}