import styled from "styled-components";
import { ConnectWallet } from "./connectWallet";
import { NavButtons } from "./navButtons";

const TopBarWrapper = styled.div`
  width: 90vw;
  height: 5vh;
  display: grid;
  grid-template-columns: 30% 20% 50%;
  margin: auto;
`;

export function TopBar() {
  return (
    <TopBarWrapper>
      <NavButtons />
      <ConnectWallet />
    </TopBarWrapper>
  );
}
