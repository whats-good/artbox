import styled from "styled-components";
import Image from "next/image";

export const FooterWrapper = styled.div`
  box-sizing: border-box;
  width: 100vw;
  border-top: 1px solid black;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 5vh;
`;
export const FooterText = styled.p`
  padding-left: 1vw;
`;
export const LogoImage = styled(Image)`
  height: 30px;
  width: auto;
  padding-left: 1vw;
`;
