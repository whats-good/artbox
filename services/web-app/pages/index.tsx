import type { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import { TopBar } from "../components/connectwallet/topbar";
import { SignUpButton, SignUpModal } from "../components/signUp";
import { DiscoverButton, DiscoverModal } from "../components/discover";
import { useAccount, useSigner } from "wagmi";
import { signInWithEthereum } from "../siwe";

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

  const [signUpModal, toggleSignUpModal] = useState<boolean>(false);
  const [discoverModal, toggleDiscoverModal] = useState<boolean>(false);

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

const SignIn = () => {

  const [reload, setReload] = useState<boolean>(false);

  const { address, isConnecting, isDisconnected } = useAccount()

  const { data: signer, isError, isLoading } = useSigner({
  })

  if (isError) {
    return <>isError...</>
  }
  if (isLoading) {
    return <>Loading...</>
  }
  if (signer && address) {
    return (
      <>
        <button onClick={ async () => {
          await signInWithEthereum(address, signer, window.location.host, window.location.origin);
          setReload(!reload)
        }}>
          Sign in
        </button>
        <button onClick={async () => await getInformation() }>Try this next</button>
      </>
    )
  }
  return (
    <>Something went wrong...</>
  )
}

async function getInformation() {
  const res = await fetch('http://localhost:4001/personal_information', {
    method: 'GET',
      credentials: 'include',
  });
  const output = await res.text();
  console.log(output);
  return output
}