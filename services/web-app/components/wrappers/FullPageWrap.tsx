import { PropsWithChildren } from "react";
import { TopBar } from "../connectwallet";
import { Footer } from "../footer";
import { FullPageWrapper, InnerWrapper } from "./styles";

export const FullPageWrap = ({ children }: PropsWithChildren) => {
  return (
    <FullPageWrapper>
      <TopBar />
      <InnerWrapper>{children}</InnerWrapper>
      <Footer />
    </FullPageWrapper>
  );
};
