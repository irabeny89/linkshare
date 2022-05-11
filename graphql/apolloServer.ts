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
import Link from "./resolvers/link";

const plugins = [
  process.env.NODE_ENV === "production"
    ? ApolloServerPluginLandingPageDisabled()
    : ApolloServerPluginLandingPageGraphQLPlayground(),
];

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: { Mutation, Query, User, Link },
  context,
  plugins,
});

export default apolloServer;
