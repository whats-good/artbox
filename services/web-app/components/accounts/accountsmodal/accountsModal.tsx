import styled from "styled-components";
import { useAccount } from "wagmi";
import { Dispatch, SetStateAction, useState } from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { Modal } from "../../modal";
import { GetAccounts } from "../../../querys/internal";
import { ConnectedAccount } from "../../connectwallet";
import { ConnectWalletMessage } from "../../signUp/signUpModal/insideSignUpModal";
import { EditAccount } from "./editMode";

//Types
type AccountsModalProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
};

//Styles
const InnerAccountsModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AccountsModal = ({ toggleShowModal }: AccountsModalProps) => {
  return (
    <Modal
      toggleShowModal={toggleShowModal}
      title="My Accounts"
      height="450px"
      defaultPosition={{
        x: 40,
        y: 40,
      }}
    >
      <InnerAccountsModal toggleShowModal={toggleShowModal} />
    </Modal>
  );
};

type InnerAccountsModalProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
};

const InnerAccountsModal = ({ toggleShowModal }: InnerAccountsModalProps) => {
  const { address } = useAccount();

  if (address) {
    return (
      <InnerAccountsModalWrapper>
        <ConnectedAccount />
        <AccountsView toggleShowModal={toggleShowModal} address={address} />
      </InnerAccountsModalWrapper>
    );
  } else {
    return (
      <InnerAccountsModalWrapper>
        <ConnectWalletMessage />
      </InnerAccountsModalWrapper>
    );
  }
};

type AccountsViewProps = {
  address: string;
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
};

const AccountsView = ({ address, toggleShowModal }: AccountsViewProps) => {
  const { loading, error, data, refetch } = useQuery(GetAccounts, {
    variables: {
      address: address,
    },
    notifyOnNetworkStatusChange: true,
  });

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editUsername, setEditUsername] = useState<string | undefined>();

  if (data?.getAccounts.__typename === "QueryGetAccountsSuccess") {
    return (
      <>
        {editMode && editUsername ? (
          <EditAccount username={editUsername} address={address} />
        ) : (
          <AccountsListWrapper>
            {data.getAccounts.data.map((account) => (
              <Account
                toggleShowModal={toggleShowModal}
                key={account.username}
                username={account.username}
                setEditUsername={setEditUsername}
                setEditMode={setEditMode}
              />
            ))}
          </AccountsListWrapper>
        )}
      </>
    );
  }

  return <AccountsListWrapper>{}</AccountsListWrapper>;
};

type AccountProps = {
  username: string;
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setEditUsername: Dispatch<SetStateAction<string | undefined>>;
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
  setEditUsername,
  setEditMode,
  toggleShowModal,
  username,
}: AccountProps) => {
  return (
    <AccountWrapper>
      <UsernameText>{username}</UsernameText>
      <Links>
        <p
          onClick={() => {
            setEditUsername(username);
            setEditMode(true);
            // toggleShowModal(false);
          }}
        >
          Edit
        </p>
        <Link href={`/${username}`}>View</Link>
      </Links>
    </AccountWrapper>
  );
};
