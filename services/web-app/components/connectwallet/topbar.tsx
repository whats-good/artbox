import styled from "styled-components";
import { ConnectWallet } from "./connectWallet";

const TopBarWrapper = styled.div`
  width: 90vw;
  height: 5vh;
  display: grid;
  grid-template-columns: 20% 50% 30%;
  margin: auto;
`;

export function TopBar() {
  return (
    <TopBarWrapper>
      <ConnectWallet />
    </TopBarWrapper>
  );
}
