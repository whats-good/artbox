import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: process.env.ZORA_GRAPHQL_URI,
    cache: new InMemoryCache(),
});

export default apolloClient;