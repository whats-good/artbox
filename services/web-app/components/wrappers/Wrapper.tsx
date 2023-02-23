import { PropsWithChildren } from "react";
import { InnerPageWrapper, BlueBar } from "./styles";

export const PageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <InnerPageWrapper>
      <BlueBar />
      {children}
    </InnerPageWrapper>
  );
};
