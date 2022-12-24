import styled from "styled-components"
import { ButtonOuter, ButtonInner } from "../button";


type GalleryHeaderProps = {
  user: string;
  bio: string;
}
type ArtistInfoButtonProps = {
  bio: string;
}

const GalleryHeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
`
const HeaderAndBioWrapper = styled.div`
  padding-left: 10px;
`
const ArtistInfoButtonWrapper = styled.div`
  display: flex;
  padding: 3px;
  justify-content: flex-end;
`

export const GalleryHeader = ({user, bio} : GalleryHeaderProps) => {
  return (
    <GalleryHeaderWrapper>
      <HeaderAndBioWrapper>
        <h1>{user}</h1>
        <p>{bio.slice(0, 60)}</p>
      </HeaderAndBioWrapper>
      <ArtistInfoButton bio={bio}/>
    </GalleryHeaderWrapper>
  )
}

const ArtistInfoButton = ({ bio } : ArtistInfoButtonProps) => {
  return (
    <ArtistInfoButtonWrapper>
      <ButtonOuter>
        <ButtonInner>Artist Info</ButtonInner>
      </ButtonOuter>
    </ArtistInfoButtonWrapper>
  )
}