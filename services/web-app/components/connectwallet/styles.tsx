import styled from "styled-components";
import { ButtonOuter } from "../button";
import { ConnectedAccount } from "./addressDisplay";

export const ConnectedAccountWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;
export const NavBarConnectedAccountWrapper = styled(ConnectedAccountWrapper)`
  padding-right: 10px;
`;
export const ConnectWalletWrapper = styled.div`
  grid-column-start: 3;
  display: flex;
  justify-content: end;
  align-items: center;
`;
export const NavButtonsWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;
export const NavButtonOuter = styled(ButtonOuter)`
  margin-right: 5px;
`;
export const TopBarWrapper = styled.div`
  width: 90vw;
  height: 5vh;
  display: grid;
  grid-template-columns: 30% 10% 60%;
  margin: auto;
`;
