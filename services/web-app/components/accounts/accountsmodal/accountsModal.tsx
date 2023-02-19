import styled from "styled-components";
import { Modal } from "../../modal";
import { useAccount } from "wagmi";
import { Dispatch, SetStateAction } from "react";
import { useQuery } from "@apollo/client";
import { GetAccounts } from "../../../querys/internal";

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
      height="300px"
      defaultPosition={{
        x: 40,
        y: 40,
      }}
    >
      <InnerAccountsModal />
    </Modal>
  );
};

const InnerAccountsModal = ({}) => {
  const { address } = useAccount();

  if (address) {
    return (
      <InnerAccountsModalWrapper>
        <AccountsView address={address} />
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
};

const AccountsView = ({ address }: AccountsViewProps) => {
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
          <Account key={account.username} username={account.username} />
        ))}
      </AccountsListWrapper>
    );
  }

  return <AccountsListWrapper>{}</AccountsListWrapper>;
};

type AccountProps = {
  username: string;
};

const AccountsListWrapper = styled.div`
  background-color: #ebebeb;
  height: 80px;
  overflow-y: scroll;
  border: 1px solid black;
  margin: 10px;
  width: 30vw;
`;
const AccountWrapper = styled.div``;

const Account = ({ username }: AccountProps) => {
  return <></>;
};
