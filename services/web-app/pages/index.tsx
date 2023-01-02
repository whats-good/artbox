import type { NextPage } from "next";
import { useState } from "react";
import { TopBar } from "../components/connectwallet/topbar";
import { SignUpButton } from "../components/signUp";
import styled from "styled-components";
import { SignUpModal } from "../components/signUp";

const ButtonWrapper = styled.div`
  width: 100px;
`
const BodyWrapper = styled.div`
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
`
const ModalWrap = styled.div`
  height: 1px;
`

const Home: NextPage = () => {

  const [signUpModal, toggleSignUpModal] = useState<Boolean>(false);
  const [discoverModal, toggleDiscoverModal] = useState<Boolean>(false);

  return (
    <>
      <TopBar />
      <ModalWrap>
        {signUpModal ? <SignUpModal toggleShowModal={toggleSignUpModal} /> : <></>}
      </ModalWrap>
      <BodyWrapper>
        <ButtonWrapper>
          <SignUpButton toggleShowModal={toggleSignUpModal} showModal={signUpModal}/>
        </ButtonWrapper>
      </BodyWrapper>
    </>
  );
};

export default Home;