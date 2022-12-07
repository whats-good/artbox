import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Mainnet, DAppProvider, Config } from "@usedapp/core";
import { ThemeProvider } from "@react95/core";

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]:
      "https://mainnet.infura.io/v3/769e786d4b7d41ae86475b916510b455",
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </DAppProvider>
  );
}

export default MyApp;
