import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

const UsersListWrapper = styled.div`
  border: 1px solid black;
  background-color: #ebebeb;
  margin-right: 20px;
  margin-left: 20px;
`;
const UserListItemWrapper = styled.div`
  border-bottom: 1px solid grey;
  margin: 5px;
`;

type UsersListProps = {
  data: {
    __typename: "QueryDiscoverUsersSuccess";
    data: Array<{ __typename?: "User"; username: string }>;
  };
};
type UserListItemProps = {
  username: string;
};

export const UsersList = ({ data }: UsersListProps) => {
  return (
    <UsersListWrapper>
      {data.data.map(({ username }) => (
        <UserListItem key={username} username={username} />
      ))}
    </UsersListWrapper>
  );
};

const UserListItem = ({ username }: UserListItemProps) => {
  const router = useRouter();
  return (
    <UserListItemWrapper>
      <Link href={`${router.asPath}${username}`}>{username}</Link>
    </UserListItemWrapper>
  );
};
