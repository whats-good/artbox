import styled from "styled-components";
import { PropsWithChildren } from "react";
import { TopBar } from "../connectwallet";
import { Footer } from "../footer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Inner = styled.div`
  height: 90vh;
`;

export const FullPageWrap = ({ children }: PropsWithChildren) => {
  return (
    <Wrapper>
      <TopBar />
      <Inner>{children}</Inner>
      <Footer />
    </Wrapper>
  );
};
