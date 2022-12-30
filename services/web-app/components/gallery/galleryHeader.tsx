import styled from "styled-components"
import { useState, Dispatch, SetStateAction } from "react";
import { ButtonOuter, ButtonInner } from "../button";
import { ArtistBioModalInside } from './artistInfoModal';
import Draggable from 'react-draggable';

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
        <Modal toggleShowModal={toggleShowModal} title="Additional Artist Info">
          <ArtistBioModalInside bio={bio} />
        </Modal>
    )}
    </>
  )
};

type ModalProps = {
  children?: JSX.Element;
  title: string;
  toggleShowModal: Dispatch<SetStateAction<Boolean>>;
}
type ModalTopBarProps = {
  title: string;
  toggleShowModal: Dispatch<SetStateAction<Boolean>>;
}

const ModalWrapper = styled.div`
  height: 600px;
  width: 450px;
  background-color: #BFBFBF;
  display: grid;
  grid-template-rows: 20px 575px;
  outline: 1px solid #7B7B7B;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  border-top: 1px solid white;
  border-left: 1px solid white;
`
const ModalTopBarWrapper = styled.div`
  display: flex;
  background-color: #008080;
  padding: 3px;
  justify-content: space-between;
`

const Modal = ({ children, title, toggleShowModal } : ModalProps) => {
  return (
    <Draggable handle=".draggable">
      <ModalWrapper>
        <ModalTopBar
          title={title}
          toggleShowModal={toggleShowModal}
        />
        {children}
      </ModalWrapper>
    </Draggable>
  )
}

const ModalTitle = styled.p`
  align-self: center;
  color: white;
`
const ModelExitButtonWrapper = styled(ButtonOuter)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 14px;
  width: 18px;
`
const ModelExitButton = styled(ButtonInner)`
  padding: 0px;
  height: 14px;
  width: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalTopBar = ({ title, toggleShowModal } : ModalTopBarProps) => {
  return (
    <ModalTopBarWrapper className="draggable">
      <ModalTitle>{title}</ModalTitle>
      <ModelExitButtonWrapper>
        <ModelExitButton onClick={() => {toggleShowModal(false)}}>x</ModelExitButton>
      </ModelExitButtonWrapper>
    </ModalTopBarWrapper>
  )
}