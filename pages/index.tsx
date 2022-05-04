import { useLazyQuery } from "@apollo/client";
import apolloClient from "graphql/apolloClient";
import { LINKS } from "graphql/documentNodes";
import { GetStaticProps } from "next";
import type { CursorConnection, LinkType, PagingInputType } from "types";
import Head from "next/head";
import { MdHome, MdMore } from "react-icons/md";
import LinkCard from "components/LinkCard";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import dynamic from "next/dynamic";

const FeedbackToast = dynamic(() => import("components/FeedBackToast"), {
  loading: () => <>loading...</>,
});

export const getStaticProps: GetStaticProps = async () => {
  const { error, data } = await apolloClient.query<
    Record<"links", CursorConnection<LinkType>>,
    Record<"args", PagingInputType>
  >({
    query: LINKS,
    variables: { args: { first: 25 } },
    fetchPolicy: "no-cache",
  });

  return !!data
    ? { props: data.links, revalidate: 5 }
    : (console.error(error), { notFound: true });
};

export default function HomePage({
  edges,
  pageInfo: { hasNextPage, endCursor },
}: CursorConnection<LinkType>) {
  const [showToast, setShowToast] = useState(false);

  const [fetchLinks, { loading, error, data }] = useLazyQuery<
    Record<"links", CursorConnection<LinkType>>,
    Record<"args", PagingInputType>
  >(LINKS, {
    variables: { args: { first: 25, after: endCursor } },
    fetchPolicy: "no-cache",
  });

  const handleMoreLinks = () =>
    data
      ? fetchLinks({
          variables: {
            args: { first: 25, after: data?.links.pageInfo.endCursor },
          },
        })
      : fetchLinks();

  const linkEdges = edges.concat(data?.links?.edges ?? []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <h2>
        <MdHome /> Home
      </h2>
      <hr />
      <h3 className="my-4">Feed</h3>
      <Row className="my-4 justify-content-center">
        {linkEdges.map(({ node }) => (
          <Col sm="5" lg="4" key={node.id}>
            <LinkCard key={node.id} {...node} />
          </Col>
        ))}
      </Row>
      <FeedbackToast error={error} setShow={setShowToast} show={showToast} />
      {hasNextPage && (
        <>
          {loading ? (
            <Spinner animation="grow" />
          ) : (
            <Button className="shadow" onClick={handleMoreLinks}>
              <MdMore /> more links
            </Button>
          )}
        </>
      )}
    </>
  );
}
