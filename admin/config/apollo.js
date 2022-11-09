import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: `https://60b9-114-122-4-48.ap.ngrok.io/`,
  cache: new InMemoryCache(),
});

export default client;
