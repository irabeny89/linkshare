import { createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import config from "config";

const {
  siteData: { ACCESS_TOKEN_KEY },
} = config;

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) ?? "";

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
  };
});

const httpLink = createHttpLink({
  uri: "/api/graphql",
});

const link = authLink.concat(httpLink);

export default link;
