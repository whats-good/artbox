import styled from 'styled-components';
import { useState, Dispatch, SetStateAction} from 'react';
import { ButtonOuter, ButtonInner } from "../button";

type ArtistBioModalInsideProps = {
  bio: string;
}
type ReadBioProps = {
  bio: string;
}

const ArtistBioModalInsideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;
const ReadBioWrapper = styled.div`
  background-color: #EBEBEB;
  border: 1px solid black;
  padding: 3px;
  height: 100%;
`;

export const ArtistBioModalInside = ({ bio } : ArtistBioModalInsideProps) => {
  return (
    <ArtistBioModalInsideWrapper>
      <ReadBio bio={bio}/>
    </ArtistBioModalInsideWrapper>
  )
}

const ReadBio = ({ bio } : ReadBioProps) => {
  return (
    <ReadBioWrapper>
      {bio}
    </ReadBioWrapper>
  )
}
