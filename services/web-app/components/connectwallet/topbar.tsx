import { ConnectWallet } from "./connectWallet";
import { NavButtons } from "./navButtons";
import { TopBarWrapper } from "./styles";

export function TopBar() {
  return (
    <TopBarWrapper>
      <NavButtons />
      <ConnectWallet />
    </TopBarWrapper>
  );
}
