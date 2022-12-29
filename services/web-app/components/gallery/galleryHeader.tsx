import styled from "styled-components"
import { useState } from "react";
import { ButtonOuter, ButtonInner } from "../button";
import { Modal } from "@react95/core";
import { ArtistBioModalInside } from './artistInfoModal';

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
        <p>{bio.slice(0, 60) + '...'}</p>
      </HeaderAndBioWrapper>
      <ArtistInfoButton bio={bio}/>
    </GalleryHeaderWrapper>
  )
}

const ArtistInfoButton = ({ bio } : ArtistInfoButtonProps) => {

  const [showModal, toggleShowModal] = useState<Boolean>(false);

  const handleOpenModal = () => toggleShowModal(true);
  const handleCloseModal = () => toggleShowModal(false);

  return (
    <>
    <ArtistInfoButtonWrapper>
      <ButtonOuter>
        <ButtonInner onClick={handleOpenModal}>Artist Info</ButtonInner>
      </ButtonOuter>
    </ArtistInfoButtonWrapper>
    {showModal && (
      <Modal
        width="450"
        height="600"
        title="Additional Artist Info"
        defaultPosition={{
          x: 40,
          y: 20,
        }}
        closeModal={handleCloseModal}
      >
        <ArtistBioModalInside bio={bio}/>
      </Modal>
    )}
    </>
  )
};