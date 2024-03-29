import { useState } from "react";
import { useAccount } from "wagmi";
import { useQuery } from "@apollo/client";
import { userInfo } from "../../querys/internal";
import { ButtonOuter, ButtonInner } from "../button";
import { ArtistBioModalInside } from "./artistInfoModalContent";
import { Modal } from "../modal";
import { shortenAddress } from "../../helpers/shortenAddress";
import { EditAccountModal } from "./galleryEditModal";
import type { GalleryHeaderProps, ArtistInfoButtonProps } from "./types";
import {
  GalleryHeaderWrapper,
  HeaderAndBioWrapper,
  ArtistInfoButtonWrapper,
  ArtistInfoText,
  ModalAnchor,
} from "./styles";

export const GalleryHeader = ({
  user,
  bio,
  userAddress,
}: GalleryHeaderProps) => {
  return (
    <GalleryHeaderWrapper>
      <HeaderAndBioWrapper>
        <h1>{user}</h1>
        <p>{bio.slice(0, 60) + "..."}</p>
      </HeaderAndBioWrapper>
      <ArtistInfoButton username={user} bio={bio} userAddress={userAddress} />
    </GalleryHeaderWrapper>
  );
};

const ArtistInfoButton = ({
  username,
  bio,
  userAddress,
}: ArtistInfoButtonProps) => {
  const { address } = useAccount();
  const [showModal, toggleShowModal] = useState<boolean>(false);
  const [showEditModal, toggleShowEditModal] = useState<boolean>(false);
  const handleOpenModal = () => toggleShowModal(!showModal);
  const [isUser] = useState<boolean>(address === userAddress);

  const { loading, error, data, refetch } = useQuery(userInfo, {
    variables: {
      name: username,
    },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });

  if (isUser && data?.user.__typename === "QueryUserSuccess") {
    return (
      <>
        <ArtistInfoButtonWrapper>
          <ArtistInfoText>
            Created By: {shortenAddress(userAddress)}
          </ArtistInfoText>
          <ButtonOuter>
            <ButtonInner onClick={() => toggleShowEditModal(!showEditModal)}>
              Edit Info
            </ButtonInner>
          </ButtonOuter>
        </ArtistInfoButtonWrapper>
        {showEditModal && data ? (
          <ModalAnchor>
            <EditAccountModal
              data={data.user.data}
              toggleShowModal={toggleShowEditModal}
            />
          </ModalAnchor>
        ) : (
          <></>
        )}
      </>
    );
  } else {
    return (
      <>
        <ArtistInfoButtonWrapper>
          <ArtistInfoText>
            Created By: {shortenAddress(userAddress)}
          </ArtistInfoText>
          <ButtonOuter>
            <ButtonInner onClick={handleOpenModal}>Artist Info</ButtonInner>
          </ButtonOuter>
        </ArtistInfoButtonWrapper>
        {showModal && (
          <Modal
            toggleShowModal={toggleShowModal}
            title="Additional Artist Info"
            height="600px"
            width="450px"
          >
            <ArtistBioModalInside bio={bio} />
          </Modal>
        )}
      </>
    );
  }
};
