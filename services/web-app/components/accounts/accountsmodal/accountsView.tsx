import styled from "styled-components";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { useQuery } from "@apollo/client";
import { GetAccounts } from "../../../querys/internal";
import { EditAccount } from "./editMode";

type AccountsViewProps = {
  address: string;
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
};
type AccountProps = {
  username: string;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setEditUsername: Dispatch<SetStateAction<string | undefined>>;
};

const AccountsListWrapper = styled.div`
  background-color: #ebebeb;
  overflow-y: scroll;
  border: 1px solid black;
  margin: 0px 10px 10px 10px;
  height: 430px;
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

export const AccountsView = ({
  address,
  toggleShowModal,
}: AccountsViewProps) => {
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

const Account = ({ setEditUsername, setEditMode, username }: AccountProps) => {
  return (
    <AccountWrapper>
      <UsernameText>{username}</UsernameText>
      <Links>
        <p
          onClick={() => {
            setEditUsername(username);
            setEditMode(true);
          }}
        >
          Edit
        </p>
        <Link href={`/${username}`}>View</Link>
      </Links>
    </AccountWrapper>
  );
};
