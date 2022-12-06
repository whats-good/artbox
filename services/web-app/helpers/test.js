import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://gateway.thegraph.com/api/89457974a27d6a710364fa19df8507d3/subgraphs/id/B333F7Ra4kuVBSwHFDfH9x9N1341GYHvdfpV94KY8Gmv",
  cache: new InMemoryCache(),
});

export function getData() {
  client
    .query({
      query: gql`
        query AccountNFTs(
          $Account: [String!] = ["0x22d2072f52386183c493b7dc9497b3c2f2d62772"]
        ) {
          accounts(where: { id_in: $Account }) {
            tokens {
              identifier
              id
              collection {
                id
                name
              }
            }
          }
        }
      `,
    })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
}
