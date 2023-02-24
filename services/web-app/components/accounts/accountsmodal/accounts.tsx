import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GetAccounts } from "../../../querys/internal";
import { EditAccount } from "./editmode/editMode";
import { Account } from "./account";
import { AccountsListWrapper } from "./styles";
import type { AccountsViewProps, UserData } from "./types";
import { ConnectedAccount } from "../../connectwallet";

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
          <>
            <ConnectedAccount connectedAddress={address} />
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
          </>
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
