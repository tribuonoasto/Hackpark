import { ApolloClient, InMemoryCache } from "@apollo/client";

import { TurboModuleRegistry } from "react-native";

const client = new ApolloClient({
  uri: "https://22e0-114-122-9-15.ap.ngrok.io/",
  cache: new InMemoryCache(),
});
export default client;
