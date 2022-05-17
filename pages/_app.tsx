import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { SSRProvider } from "react-bootstrap";
import Layout from "components/Layout";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "apolloGraphql/client/index";
import ErrorBoundary from "components/ErrorBoundary";
import { useEffect, useState } from "react";
import config from "config";
import { decode } from "jsonwebtoken";
import ForbiddenAlert from "components/ForbiddenAlert";
import { AuthPayloadType } from "types";
import { authPayloadVar } from "apolloGraphql/client/reactiveVars";

const {
  siteData: { ACCESS_TOKEN_KEY },
} = config;

function MyApp({ Component, pageProps }: AppProps) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const authPayload = decode(
      localStorage.getItem(ACCESS_TOKEN_KEY) ?? ""
    ) as AuthPayloadType | null;

    // update authpayload global state
    authPayloadVar(authPayload);

    // @ts-ignore
    setIsAuth(Component?.audiences?.includes(authPayload?.aud));
    // @ts-ignore
  }, [Component?.audiences]);

  return (
    <SSRProvider>
      <ErrorBoundary>
        <ApolloProvider client={apolloClient}>
          <Layout>
            {Component.displayName === "dashboard" ? (
              isAuth ? (
                <Component {...pageProps} />
              ) : (
                <ForbiddenAlert />
              )
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </ApolloProvider>
      </ErrorBoundary>
    </SSRProvider>
  );
}
export default MyApp;
