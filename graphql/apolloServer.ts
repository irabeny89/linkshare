import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-micro";
import typeDefs from "graphql/typeDefs";
import context from "./context";
import Mutation from "./resolvers/mutations";
import Query from "./resolvers/queries";
import User from "./resolvers/user";

const plugins = [
  process.env.NODE_ENV === "production"
    ? ApolloServerPluginLandingPageDisabled()
    : ApolloServerPluginLandingPageGraphQLPlayground(),
];

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: { Mutation, Query, User },
  context,
  plugins,
});

export default apolloServer;
