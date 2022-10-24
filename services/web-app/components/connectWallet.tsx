import { shortenAddress, useEthers } from '@usedapp/core'
import { ConnectWalletWrapper } from './styled/topbarstyled';
import { ButtonOuter, ButtonInner } from './styled/buttonstyled';

interface ButtonProps {
  text: String;
  click: any;
}

function Button( { text, click } : ButtonProps) : JSX.Element {
  return (
    <ButtonOuter>
      <ButtonInner onClick={() => click()}> { text } </ButtonInner>
    </ButtonOuter>
  )
};

export function ConnectWallet() {
  const { account, activateBrowserWallet, deactivate } = useEthers();

  const ConnectButton = () => (
    <Button text="Connect" click={activateBrowserWallet} />
  )
  const DisconnectButton = () => (
    <Button text="Disconnect" click={deactivate} />
  )

  return (
    <ConnectWalletWrapper>
      {account && (
        <div>
          <div className="inline">
            &nbsp;
            {/* <div className="account">{shortenAddress(account)}</div> */}
          </div>
          <br />
        </div>
      )}
      {!account && <ConnectButton />}
      {account && <DisconnectButton />}
      <br />
    </ConnectWalletWrapper>
  )
}