import { useRouter } from "next/router";
import Link from "next/link";
import { ButtonInner } from "../button";
import { NavButtonsWrapper, NavButtonOuter } from "./styles";

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
