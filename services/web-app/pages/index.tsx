import type { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import { TopBar } from "../components/connectwallet/topbar";
import { SignUpButton, SignUpModal } from "../components/signUp";
import { DiscoverButton, DiscoverModal } from "../components/discover";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { SiweMessage } from 'siwe';



const ButtonWrapper = styled.div`
  width: 200px;
`;
const BodyWrapper = styled.div`
  height: calc(100vh - 52px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalAnchor = styled.div`
  height: 1px;
`;

const Home: NextPage = () => {

  const [signUpModal, toggleSignUpModal] = useState<Boolean>(false);
  const [discoverModal, toggleDiscoverModal] = useState<Boolean>(false);


  const { address, isConnecting, isDisconnected } = useAccount();

  return (
    <>
      <SignIn />
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


function createSiweMessage (address, statement) {
  const message = new SiweMessage({
    domain,
    address,
    statement,
    uri: origin,
    version: '1',
    chainId: '1'
  });
  return message.prepareMessage();
}


const SignIn = () => {



  return (
    <>

    </>
  )
}


function getAddress(sig : string) {

  const digest = ethers.utils.arrayify(ethers.utils.hashMessage('sam'));

  const output = ethers.utils.verifyMessage(digest, sig);

  console.log(output === "0x47f172C3Aed744dE18A77d1db426effC89750EDb");
  console.log('ACTUAL: ', output);
  console.log('EXPECTED: ', "0x47f172C3Aed744dE18A77d1db426effC89750EDb")
  return output;
}