import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@react95/core";
import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { mainnet } from '@wagmi/core/chains';

// Configure chains & providers with the Alchemy provider.
const { chains, provider, webSocketProvider } = configureChains([mainnet], [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY }),
  publicProvider(),
])

const client = createClient({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains }),
  ],
  provider,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </WagmiConfig>
  );
}

export default MyApp;
