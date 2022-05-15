import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { SSRProvider } from "react-bootstrap";
import Layout from "components/Layout";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "apolloGraphql/client/index";
import ErrorBoundary from "components/ErrorBoundary";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <SSRProvider>
        <ApolloProvider client={apolloClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </SSRProvider>
    </ErrorBoundary>
  );
}
export default MyApp;
