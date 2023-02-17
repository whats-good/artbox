import type { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import { SignUpButton, SignUpModal } from "../components/signUp";
import { DiscoverButton, DiscoverModal } from "../components/discover";

const ButtonWrapper = styled.div`
  width: 200px;
`;
const BodyWrapper = styled.div`
  height: calc(100vh - 87px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalAnchor = styled.div`
  height: 1px;
`;

const Home: NextPage = () => {

  const [signUpModal, toggleSignUpModal] = useState<boolean>(false);
  const [discoverModal, toggleDiscoverModal] = useState<boolean>(false);

  return (
    <>
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