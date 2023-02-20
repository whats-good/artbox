import styled from "styled-components";
import { ButtonInner, ButtonOuter } from "../components";
import Link from "next/link";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default function Custom404() {
  return (
    <Wrapper>
      <h1>404 - Page Not Found...</h1>
      <Link href="/">
        <ButtonOuter>
          <ButtonInner>{`<< Return Home`}</ButtonInner>
        </ButtonOuter>
      </Link>
    </Wrapper>
  );
}
