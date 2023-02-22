import styled from "styled-components";
import { ButtonInner, ButtonOuter } from "../../button";

const PageButtonsWrapper = styled.div`
  display: flex;
  grid-template-columns: 1fr 1fr;
  margin-right: 20px;
  height: max-content;
  justify-content: flex-end;
  padding-top: 5px;
`;

export const PageButtons = () => {
  return (
    <PageButtonsWrapper>
      <ButtonOuter>
        <ButtonInner>{"<<"}</ButtonInner>
      </ButtonOuter>
      <ButtonOuter>
        <ButtonInner>{">>"}</ButtonInner>
      </ButtonOuter>
    </PageButtonsWrapper>
  );
};
