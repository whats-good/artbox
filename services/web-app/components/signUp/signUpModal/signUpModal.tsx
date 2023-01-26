import { Modal } from "../../modal";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ButtonInner, ButtonOuter } from "../../button";
import { useQuery, useMutation } from '@apollo/client';
import { useAccount, useSigner } from 'wagmi';
import { shortenAddress } from "../../../helpers/shortenAddress";
import { useProvider } from 'wagmi';
import { validateContract } from "../../../helpers"
import { InsideSignUpModal } from "./insideSignUpModal";
import { StyledLabel, StyledInput, StyledForm } from "./commonStyles";
import { createUser } from "../../../querys/internal";
import { signInWithEthereum } from "../../../siwe";
import { LoggedInContext } from "../../../utils/loggedInContext";
import { createOrUpdateUser } from "../../../helpers/createUser";

//Types

type SignUpModalProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
}

export const SignUpModal = ({ toggleShowModal } : SignUpModalProps) => {
  return (
    <>
      <Modal
        toggleShowModal={toggleShowModal}
        title="Create Profile"
        height="500px"
        width="450px"
        defaultPosition={{
          x: 40,
          y: 40,
        }}
      >
        <InsideSignUpModal />
      </Modal>
    </>
  )
}
