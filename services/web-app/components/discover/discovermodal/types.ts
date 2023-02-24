import { Dispatch, SetStateAction } from "react";

export type DiscoverModalProps = {
  toggleShowModal: Dispatch<SetStateAction<boolean>>;
};
export type UsersListProps = {
  data: {
    __typename: "QueryDiscoverUsersSuccess";
    data: Array<{ __typename?: "User"; username: string }>;
  };
};
export type UserListItemProps = {
  username: string;
};
