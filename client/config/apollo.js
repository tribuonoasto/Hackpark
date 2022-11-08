import { ApolloClient, InMemoryCache } from "@apollo/client";

import { TurboModuleRegistry } from "react-native";

const client = new ApolloClient({
  uri: "https://7fb8-110-137-193-158.ap.ngrok.io/",
  cache: new InMemoryCache(),
});
export default client;
