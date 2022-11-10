import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: `https://hackpark.herokuapp.com/`,
  cache: new InMemoryCache(),
});

export default client;
