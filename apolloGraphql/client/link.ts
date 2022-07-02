import { createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { siteData } from "config";

const { ACCESS_TOKEN_KEY } = siteData;

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
