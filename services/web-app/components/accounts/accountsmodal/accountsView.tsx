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

export type UserData = {
  __typename?: "User";
  address: string;
  username: string;
  description?: string | null;
  contracts: Array<{ __typename?: "SmartContract"; contractAddress: string }>;
};

type AccountProps = {
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setUserToEdit: Dispatch<SetStateAction<UserData | undefined>>;
  data: UserData;
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
  const [userToEdit, setUserToEdit] = useState<UserData | undefined>();

  if (data?.getAccounts.__typename === "QueryGetAccountsSuccess") {
    console.log("SUCCESS");
    return (
      <>
        {editMode && userToEdit ? (
          <EditAccount data={userToEdit} />
        ) : (
          <AccountsListWrapper>
            {data.getAccounts.data.map((account) => (
              <Account
                data={account}
                key={account.username}
                setUserToEdit={setUserToEdit}
                setEditMode={setEditMode}
              />
            ))}
          </AccountsListWrapper>
        )}
      </>
    );
  }
  return <AccountsListWrapper>yo</AccountsListWrapper>;
};

const Account = ({ setUserToEdit, setEditMode, data }: AccountProps) => {
  return (
    <AccountWrapper>
      <UsernameText>{data.username}</UsernameText>
      <Links>
        <p
          onClick={() => {
            setUserToEdit(data);
            setEditMode(true);
          }}
        >
          Edit
        </p>
        <Link href={`/${data.username}`}>View</Link>
      </Links>
    </AccountWrapper>
  );
};
