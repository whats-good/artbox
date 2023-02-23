import { ButtonInner, ButtonOuter } from "../../button";
import { PageButtonsWrapper } from "./styles";

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
