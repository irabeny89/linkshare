import { InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        links: relayStylePagination(),
      },
    },
    User: {
      fields: {
        links: relayStylePagination(),
        upvotedLinks: relayStylePagination()
      }
    }
  },
});

export default cache;
