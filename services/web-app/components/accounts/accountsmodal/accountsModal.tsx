import styled from "styled-components";
import { Modal } from "../../modal";
import { useAccount } from "wagmi";
import { Dispatch, SetStateAction } from "react";
import { useQuery } from "@apollo/client";
import { GetAccounts } from "../../../querys/internal";
import { ConnectedAccount } from "../../connectwallet";
import Link from "next/link";

//Types
type AccountsModalProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
  toggleEditAccount: Dispatch<SetStateAction<boolean>>;
  setAccountEdited: Dispatch<SetStateAction<string | undefined>>;
};

//Styles
const InnerAccountsModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AccountsModal = ({
  toggleShowModal,
  toggleEditAccount,
  setAccountEdited,
}: AccountsModalProps) => {
  return (
    <Modal
      toggleShowModal={toggleShowModal}
      title="My Accounts"
      height="300px"
      defaultPosition={{
        x: 40,
        y: 40,
      }}
    >
      <InnerAccountsModal
        toggleShowModal={toggleShowModal}
        toggleEditAccount={toggleEditAccount}
        setAccountEdited={setAccountEdited}
      />
    </Modal>
  );
};

type InnerAccountsModalProps = {
  toggleEditAccount: Dispatch<SetStateAction<boolean>>;
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
  setAccountEdited: Dispatch<SetStateAction<string | undefined>>;
};

const InnerAccountsModal = ({
  toggleShowModal,
  toggleEditAccount,
  setAccountEdited,
}: InnerAccountsModalProps) => {
  const { address } = useAccount();

  if (address) {
    return (
      <InnerAccountsModalWrapper>
        <ConnectedAccount />
        <AccountsView
          setAccountEdited={setAccountEdited}
          toggleShowModal={toggleShowModal}
          toggleEditAccount={toggleEditAccount}
          address={address}
        />
      </InnerAccountsModalWrapper>
    );
  } else {
    return (
      <InnerAccountsModalWrapper>
        <p>Please connect Wallet</p>
      </InnerAccountsModalWrapper>
    );
  }
};

type AccountsViewProps = {
  address: string;
  toggleEditAccount: Dispatch<SetStateAction<boolean>>;
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
  setAccountEdited: Dispatch<SetStateAction<string | undefined>>;
};

const AccountsView = ({
  address,
  toggleShowModal,
  toggleEditAccount,
  setAccountEdited,
}: AccountsViewProps) => {
  const { loading, error, data, refetch } = useQuery(GetAccounts, {
    variables: {
      address: address,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (data?.getAccounts.__typename === "QueryGetAccountsSuccess") {
    return (
      <AccountsListWrapper>
        {data.getAccounts.data.map((account) => (
          <Account
            toggleShowModal={toggleShowModal}
            toggleEditAccount={toggleEditAccount}
            key={account.username}
            username={account.username}
          />
        ))}
      </AccountsListWrapper>
    );
  }

  return <AccountsListWrapper>{}</AccountsListWrapper>;
};

type AccountProps = {
  username: string;
  toggleEditAccount: Dispatch<SetStateAction<boolean>>;
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
};

const AccountsListWrapper = styled.div`
  background-color: #ebebeb;
  overflow-y: scroll;
  border: 1px solid black;
  margin: 0px 10px 10px 10px;
  width: 30vw;
  height: 210px;
`;
const AccountWrapper = styled.div`
  background-color: #d8d8d8;
  display: flex;
  flex-direction: row;
  padding: 5px;
  height: 20px;
  align-items: center;
  border-bottom: 1px solid black;
  justify-content: space-between;
`;

const UsernameText = styled.p`
  padding: 0px;
  margin: 0px;
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Account = ({
  toggleShowModal,
  username,
  toggleEditAccount,
}: AccountProps) => {
  return (
    <AccountWrapper>
      <UsernameText>{username}</UsernameText>
      <Links>
        <p
          onClick={() => {
            toggleShowModal(false);
            toggleEditAccount(true);
          }}
        >
          Edit
        </p>
        <Link href={`/${username}`}>View</Link>
      </Links>
    </AccountWrapper>
  );
};
