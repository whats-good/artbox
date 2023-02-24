import Link from "next/link";
import { ButtonInner, ButtonOuter } from "../../button";
import { AccountProps } from "./types";
import { AccountWrapper, UsernameText, Links } from "./styles";

export const Account = ({ setUserToEdit, setEditMode, data }: AccountProps) => {
  return (
    <AccountWrapper>
      <UsernameText>{data.username}</UsernameText>
      <Links>
        <ButtonOuter>
          <ButtonInner
            onClick={() => {
              setUserToEdit(data);
              setEditMode(true);
            }}
          >
            Edit
          </ButtonInner>
        </ButtonOuter>
        <Link href={`/${data.username}`}>
          <ButtonOuter>
            <ButtonInner>View</ButtonInner>
          </ButtonOuter>
        </Link>
      </Links>
    </AccountWrapper>
  );
};
