import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-micro";
import typeDefs from "graphql/typeDefs";
import context from "./context";
import mocks from "./mocks";

const plugins = [
  process.env.NODE_ENV === "production"
    ? ApolloServerPluginLandingPageDisabled()
    : ApolloServerPluginLandingPageGraphQLPlayground(),
];

const apolloServer = new ApolloServer({
  mocks,
  typeDefs,
  context,
  plugins,
});

export default apolloServer;
