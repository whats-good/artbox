import styled from "styled-components";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GetAccounts } from "../../../querys/internal";
import { EditAccount } from "./editmode/editMode";
import { Account } from "./account";

export type UserData = {
  __typename?: "User";
  address: string;
  username: string;
  description?: string | null;
  contracts: Array<{ __typename?: "SmartContract"; contractAddress: string }>;
};
type AccountsViewProps = {
  address: string;
};

const AccountsListWrapper = styled.div`
  background-color: #ebebeb;
  overflow-y: scroll;
  border: 1px solid black;
  margin: 0px 10px 10px 10px;
  height: 430px;
`;

export const AccountsView = ({ address }: AccountsViewProps) => {
  const { loading, error, data, refetch } = useQuery(GetAccounts, {
    variables: {
      address: address,
    },
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [userToEdit, setUserToEdit] = useState<UserData | undefined>();

  if (data?.getAccounts.__typename === "QueryGetAccountsSuccess") {
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
  return (
    <AccountsListWrapper>
      {loading && <p>Loading...</p>}
      {error && <p>There was an error...</p>}
    </AccountsListWrapper>
  );
};
