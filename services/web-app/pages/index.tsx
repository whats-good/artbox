import type { NextPage } from "next";
import { useState } from "react";
import styled from "styled-components";
import { SignUpButton, SignUpModal } from "../components/signUp";
import { DiscoverButton, DiscoverModal } from "../components/discover";
import { AccountsButton, AccountsModal } from "../components/accounts";
import { EditAccountModal } from "../components/editaccount/editaccountmodal/editAccountModal";

const ButtonWrapper = styled.div`
  width: 150px;
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
  const [accountsModal, toggleAccountsModal] = useState<boolean>(false);
  const [editAccountModal, toggleEditAccountModal] = useState<boolean>(false);
  const [accountEdited, setAccountEdited] = useState<string>();

  return (
    <>
      <ModalAnchor>
        {signUpModal && <SignUpModal toggleShowModal={toggleSignUpModal} />}
        {discoverModal && (
          <DiscoverModal toggleShowModal={toggleDiscoverModal} />
        )}
        {accountsModal && (
          <AccountsModal
            toggleEditAccount={toggleEditAccountModal}
            toggleShowModal={toggleAccountsModal}
            setAccountEdited={setAccountEdited}
          />
        )}
        {editAccountModal && (
          <EditAccountModal
            accountEdited={accountEdited}
            toggleShowModal={toggleEditAccountModal}
          />
        )}
      </ModalAnchor>
      <BodyWrapper>
        <ButtonWrapper>
          <SignUpButton
            toggleShowModal={toggleSignUpModal}
            showModal={signUpModal}
          />
          <DiscoverButton
            toggleShowModal={toggleDiscoverModal}
            showModal={discoverModal}
          />
          <AccountsButton
            toggleShowModal={toggleAccountsModal}
            showModal={accountsModal}
          />
        </ButtonWrapper>
      </BodyWrapper>
    </>
  );
};

export default Home;
