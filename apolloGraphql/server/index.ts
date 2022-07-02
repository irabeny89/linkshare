import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-micro";
import typeDefs from "apolloGraphql/server/typeDefs";
import context from "../client/context";
import Mutation from "./resolvers/mutations";
import Query from "./resolvers/queries";
import User from "./resolvers/user";
import Link from "./resolvers/link";

const plugins = [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  resolvers = { Mutation, Query, User, Link },
  config = { typeDefs, resolvers, context, plugins };

const apolloServer = new ApolloServer(config);

export default apolloServer;
