import { ApolloClient, InMemoryCache } from "@apollo/client";

import { TurboModuleRegistry } from "react-native";

const client = new ApolloClient({
  uri: "https://c3ff-36-71-141-131.ap.ngrok.io/",
  cache: new InMemoryCache(),
});
export default client;
