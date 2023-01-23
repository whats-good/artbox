import "../styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import {
  WagmiConfig,
  createClient,
  configureChains,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { mainnet } from '@wagmi/core/chains';
import { ApolloProvider } from '@apollo/client';
import ApolloClient from '../utils/apollo-client'
import { PageLoading } from "../components/loading";

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

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url : string) => url !== router.asPath && setLoading(true);
    const handleComplete = (url : string) => url === router.asPath && setLoading(false);
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });


  return (
    <WagmiConfig client={client}>
        <ApolloProvider client={ApolloClient}>
          {loading ? <PageLoading /> : <Component {...pageProps} />}
        </ApolloProvider>
    </WagmiConfig>
  );
}

export default MyApp;
