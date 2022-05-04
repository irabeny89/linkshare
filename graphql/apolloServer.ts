import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import { ApolloServer, AuthenticationError } from "apollo-server-micro";
import type { GraphContextType } from "types";
import typeDefs from "graphql/typeDefs";

const apolloServer = new ApolloServer({
  mocks: true,
  typeDefs,
  plugins: [
    process.env.NODE_ENV === "production"
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  context: async ({ req, res }: Pick<GraphContextType, "req" | "res">): Promise<GraphContextType> => {
    try {
      // authenticate user
      // TODO: start database connection & add models to context
      return { req, res }
    } catch(error) {
      throw new AuthenticationError("Not authenticated, Login or signup to continue.")
    }
  }
})

export default apolloServer