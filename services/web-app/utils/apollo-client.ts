import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

const zoraEndpoint = new HttpLink({
  uri: process.env.NEXT_PUBLIC_ZORA_GRAPHQL_URI,
});
const userEndpoint = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
  credentials: "include",
});

const apolloClient = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "zora",
    zoraEndpoint,
    userEndpoint
  ),
  cache: new InMemoryCache(),
});

export default apolloClient;
