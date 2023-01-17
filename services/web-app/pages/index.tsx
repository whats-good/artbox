import type { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import { TopBar } from "../components/connectwallet/topbar";
import { SignUpButton, SignUpModal } from "../components/signUp";
import { DiscoverButton, DiscoverModal } from "../components/discover";

const ButtonWrapper = styled.div`
  width: 200px;
`
const BodyWrapper = styled.div`
  height: calc(100vh - 52px);
  display: flex;
  justify-content: center;
  align-items: center;
`
const ModalAnchor = styled.div`
  height: 1px;
`

const Home: NextPage = () => {

  const [signUpModal, toggleSignUpModal] = useState<Boolean>(false);
  const [discoverModal, toggleDiscoverModal] = useState<Boolean>(false);

  return (
    <>
      <TopBar />
      <ModalAnchor>
        {signUpModal ? <SignUpModal toggleShowModal={toggleSignUpModal} /> : <></>}
        {discoverModal ? <DiscoverModal toggleShowModal={toggleDiscoverModal} /> : <></>}
      </ModalAnchor>
      <BodyWrapper>
        <ButtonWrapper>
          <SignUpButton toggleShowModal={toggleSignUpModal} showModal={signUpModal}/>
          <DiscoverButton toggleShowModal={toggleDiscoverModal} showModal={discoverModal}/>
        </ButtonWrapper>
      </BodyWrapper>
    </>
  );
};

export default Home;