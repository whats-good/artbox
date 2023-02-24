import QRLogo from "../../assets/QR8-logo.png";
import Link from "next/link";
import { FooterWrapper, LogoImage, FooterText } from "./styles";

export const Footer = () => {
  return (
    <FooterWrapper>
      <Link href={"/"}>
        <LogoImage src={QRLogo} alt="QR8 Logo" />
      </Link>
      <FooterText>
        Created by{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/logan_larkin"
        >
          @logan_larkin
        </Link>{" "}
        |{" "}
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/Theskbeats"
        >
          @skbeats
        </Link>
      </FooterText>
    </FooterWrapper>
  );
};
