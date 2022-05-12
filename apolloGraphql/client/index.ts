import { ApolloClient } from "@apollo/client";
import cache from "./cache";
import link from "./link";

const apolloClient = new ApolloClient({
  cache,
  link,
  name: "Link Share",
  version: "v2"
});

export default apolloClient;
