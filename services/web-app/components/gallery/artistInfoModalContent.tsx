import styled from 'styled-components';
import { useState, Dispatch, SetStateAction} from 'react';
import { ButtonOuter, ButtonInner } from "../button";

type ArtistBioModalInsideProps = {
  bio: string;
}
type EditableBioProps = {
  newBio: string;
  setNewBio: Dispatch<SetStateAction<string>>
}
type ReadBioProps = {
  bio: string;
}
type ArtistBioTopBarProps = {
  setEditable: Dispatch<SetStateAction<boolean>>
  editable: boolean;
  newBio: string;
}

const ArtistBioModalInsideWrapper = styled.div`
  display: grid;
  grid-template-rows: 12% 87%;
  height: 100%;
  padding: 5px;
`
const ArtistBioTopBarWrapper = styled.div`
  background-color: #EBEBEB;
  border: 1px solid black;
  display: flex;
  height: fit-content;
  padding: 5px;
  justify-content: flex-end;
`
const ReadBioWrapper = styled.div`
  background-color: #EBEBEB;
  border: 1px solid black;
  padding: 3px;
`
const EditableBioWrapper = styled.textarea`
  background-color: #EBEBEB;
  border: 1px solid black;
  padding: 3px;
`

export const ArtistBioModalInside = ({ bio } : ArtistBioModalInsideProps) => {
  const [editable, setEditable] = useState<boolean>(false);
  const [newBio, setNewBio] = useState(bio);

  return (
    <ArtistBioModalInsideWrapper>
      <ArtistBioTopBar setEditable={setEditable} editable={editable} newBio={newBio}/>
      {editable ? <EditableBio newBio={newBio} setNewBio={setNewBio}/> : <ReadBio bio={bio}/>}
    </ArtistBioModalInsideWrapper>
  )
}

const EditableBio = ({ newBio, setNewBio } : EditableBioProps) => {
  return (
    <EditableBioWrapper onChange={(e) => {
      setNewBio(e.target.value)}}>
      {newBio}
    </EditableBioWrapper>
  )
}

const ReadBio = ({ bio } : ReadBioProps) => {
  return (
    <ReadBioWrapper>
      {bio}
    </ReadBioWrapper>
  )
}

const ArtistBioTopBar = ({ editable, setEditable, newBio } : ArtistBioTopBarProps) => {

  return (
    <ArtistBioTopBarWrapper>
      {/* {editable
        ?
        <ButtonOuter>
          <ButtonInner onClick={() => {setEditable(false)}}>Save</ButtonInner>
        </ButtonOuter>
        :
        <ButtonOuter>
          <ButtonInner onClick={() => {setEditable(true)}}>Edit</ButtonInner>
        </ButtonOuter>
      } */}
    </ArtistBioTopBarWrapper>
  )
}