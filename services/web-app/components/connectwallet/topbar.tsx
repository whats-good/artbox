import { TopBarWrapper } from "./styled/topbarstyled";
import { ConnectWallet } from "./connectWallet";

export function TopBar() {
  return (
    <TopBarWrapper>
      <ConnectWallet />
    </TopBarWrapper>
  );
}
