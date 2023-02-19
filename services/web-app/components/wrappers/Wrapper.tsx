import styled from "styled-components";
import { PropsWithChildren } from "react";

const BlueBar = styled.div`
  background-color: #008080;
  margin: 1px;
  height: 15px;
`;
const Wrapper = styled.div`
  border: 1px solid #ffffff;
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  outline: 1px solid #bfbfbf;
  width: 90vw;
  height: 85vh;
  display: flex;
  flex-direction: column;
`;

export const PageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Wrapper>
      <BlueBar />
      {children}
    </Wrapper>
  );
};
