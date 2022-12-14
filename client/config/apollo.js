import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TurboModuleRegistry } from "react-native";

const httpLink = createHttpLink({
  uri: "https://hackpark.herokuapp.com/",
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists

  const token = await AsyncStorage.getItem("access_token");

  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      access_token: token,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   uri: "",
//   cache: new InMemoryCache(),
// });
export default client;
