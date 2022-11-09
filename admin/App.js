import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import Admin from "./screen/admin";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Admin />
    </ApolloProvider>
  );
}
