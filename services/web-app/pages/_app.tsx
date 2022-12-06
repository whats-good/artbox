import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Mainnet, DAppProvider, Config } from "@usedapp/core";
import { ThemeProvider } from "@react95/core";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]:
      "https://mainnet.infura.io/v3/769e786d4b7d41ae86475b916510b455",
  },
};

const client = new ApolloClient({
  // uri: 'https://flyby-gateway.herokuapp.com/',
  uri: "https://gateway.thegraph.com/api/89457974a27d6a710364fa19df8507d3/subgraphs/id/B333F7Ra4kuVBSwHFDfH9x9N1341GYHvdfpV94KY8Gmv",
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DAppProvider config={config}>
      <ThemeProvider>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ThemeProvider>
    </DAppProvider>
  );
}

export default MyApp;
