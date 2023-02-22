import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import { ButtonInner, ButtonOuter } from "../button";

const NavButtonsWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;
const NavButtonOuter = styled(ButtonOuter)`
  margin-right: 5px;
`;

export const NavButtons = () => {
  const router = useRouter();
  const { user } = router.query;

  return (
    <NavButtonsWrapper>
      {router.pathname.includes("[user]") && <Navbutton text="Home" url="/" />}
      {router.pathname.includes("[user]/[collection]/[id]") && (
        <Navbutton text={`Return to ${user}`} url={`/${user}`} />
      )}
    </NavButtonsWrapper>
  );
};

type NavButtonProps = {
  url: string;
  text: string;
};

const Navbutton = ({ url, text }: NavButtonProps) => {
  return (
    <NavButtonOuter>
      <Link href={url}>
        <ButtonInner>{text}</ButtonInner>
      </Link>
    </NavButtonOuter>
  );
};
