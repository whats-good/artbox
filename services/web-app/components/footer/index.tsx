import styled from "styled-components";
import Image from "next/image";
import QRLogo from "../../assets/QR8-logo.png";
import Link from "next/link";

const FooterWrapper = styled.div`
  width: 100vw;
  border-top: 1px solid black;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const FooterText = styled.p`
  padding-left: 1vw;
`;
const LogoImage = styled(Image)`
  height: 30px;
  width: auto;
  padding-left: 5vw;
`;

export const Footer = () => {
  return (
    <FooterWrapper>
      <Link href={"/"}>
        <LogoImage src={QRLogo} alt="QR8 Logo" />
      </Link>
      <FooterText>
        Created by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/logan_larkin"
        >
          @logan_larkin
        </a>{" "}
        |{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/Theskbeats"
        >
          @skbeats
        </a>
      </FooterText>
    </FooterWrapper>
  );
};
