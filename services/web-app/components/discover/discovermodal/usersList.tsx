import Link from "next/link";
import { useRouter } from "next/router";
import { UsersListWrapper, UserListItemWrapper } from "./styles";
import type { UsersListProps, UserListItemProps } from "./types";

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
