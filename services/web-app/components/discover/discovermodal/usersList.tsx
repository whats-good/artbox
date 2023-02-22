import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { DiscoverUserQuery } from "../../../.utils/internalTypes/graphql";

const UsersListWrapper = styled.div`
  border: 1px solid black;
  background-color: #ebebeb;
  margin-right: 20px;
  margin-left: 20px;
`;

type UsersListProps = {
  data?: DiscoverUserQuery;
};

export const UsersList = (props: UsersListProps) => {
  if (
    props.data &&
    props.data.discoverUsers.__typename === "QueryDiscoverUsersSuccess"
  ) {
    return (
      <UsersListWrapper>
        {props.data.discoverUsers.data.map(({ username }) => (
          <UserListItem key={username} username={username} />
        ))}
      </UsersListWrapper>
    );
  }

  // If data prop was not passed down return error
  return <>Sorry there was an error.</>;
};

type UserListItemProps = {
  username: string;
};

const UserListItemWrapper = styled.div`
  border-bottom: 1px solid grey;
  margin: 5px;
`;

const UserListItem = ({ username }: UserListItemProps) => {
  const router = useRouter();
  return (
    <UserListItemWrapper>
      <Link href={`${router.asPath}${username}`}>{username}</Link>
    </UserListItemWrapper>
  );
};
