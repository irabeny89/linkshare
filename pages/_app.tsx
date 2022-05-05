import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { SSRProvider } from "react-bootstrap";
import Layout from "components/Layout";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "graphql/apolloClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <SSRProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SSRProvider>
    </ApolloProvider>
  );
}
export default MyApp;
