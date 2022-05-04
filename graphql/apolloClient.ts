import { ApolloClient } from "@apollo/client";
import cache from "./cache";

const apolloClient = new ApolloClient({
  cache,
  uri: "http://localhost:3000/api/graphql"
})

export default apolloClient