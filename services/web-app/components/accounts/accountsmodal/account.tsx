import styled from "styled-components";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { UserData } from "./accounts";

type AccountProps = {
  setEditMode: Dispatch<SetStateAction<boolean>>;
  setUserToEdit: Dispatch<SetStateAction<UserData | undefined>>;
  data: UserData;
};

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

export const Account = ({ setUserToEdit, setEditMode, data }: AccountProps) => {
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
