import styled from "styled-components"
import { useState } from "react";
import { useAccount } from "wagmi";
import { ButtonOuter, ButtonInner } from "../button";
import { ArtistBioModalInside } from "./artistInfoModalContent";
import { Modal } from "../modal";
import { SignUpModal } from "../signUp";

type GalleryHeaderProps = {
  user: string;
  bio: string;
  userAddress: string;
}
type ArtistInfoButtonProps = {
  bio: string;
  userAddress: string;
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

export const GalleryHeader = ({user, bio, userAddress} : GalleryHeaderProps) => {
  return (
    <GalleryHeaderWrapper>
      <HeaderAndBioWrapper>
        <h1>{user}</h1>
        <p>{bio.slice(0, 60) + '...'}</p>
      </HeaderAndBioWrapper>
      <ArtistInfoButton bio={bio} userAddress={userAddress}/>
    </GalleryHeaderWrapper>
  )
}

const ArtistInfoButton = ({ bio, userAddress } : ArtistInfoButtonProps) => {

  const { address } = useAccount();
  const [showModal, toggleShowModal] = useState<boolean>(false);
  const [showSignupModal, toggleShowSignupModal] = useState<boolean>(false);
  const handleOpenModal = () => toggleShowModal(!showModal);
  const [isUser] = useState<boolean>(address === userAddress);

  if (!isUser) {
    return (
      <>
      <ArtistInfoButtonWrapper>
        <ButtonOuter>
          <ButtonInner onClick={handleOpenModal}>Artist Info</ButtonInner>
        </ButtonOuter>
      </ArtistInfoButtonWrapper>
      {showModal && (
          <Modal toggleShowModal={toggleShowModal} title="Additional Artist Info" height="600px" width="450px">
            <ArtistBioModalInside bio={bio} />
          </Modal>
      )}
      </>
    )
  }
  if (isUser) {
    return (
      <>
      <ArtistInfoButtonWrapper>
        <ButtonOuter>
          <ButtonInner onClick={() => toggleShowSignupModal(!showSignupModal)}>Edit Info</ButtonInner>
        </ButtonOuter>
      </ArtistInfoButtonWrapper>
      {showSignupModal && (
        <SignUpModal toggleShowModal={toggleShowSignupModal} />
      )}
      </>
    )
  } else {
    return (
      <>Error</>
    )
  }
};