import { useLazyQuery } from "@apollo/client";
import apolloClient from "graphql/apolloClient";
import { LINKS } from "graphql/documentNodes";
import { GetStaticProps } from "next";
import type { CursorConnection, LinkType, PagingInputType } from "types";
import {
  MdHome,
  MdMore,
  MdShare,
  MdAddLink,
  MdDynamicFeed,
} from "react-icons/md";
import LinkCard from "components/LinkCard";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { useState } from "react";
import dynamic from "next/dynamic";
import PageTitle from "components/PageTitle";
import Link from "next/link";

const FeedbackToast = dynamic(() => import("components/FeedBackToast"), {
  loading: () => <>loading...</>,
});

// export const getStaticProps: GetStaticProps = async () => {
//   const { error, data } = await apolloClient.query<
//     Record<"links", CursorConnection<LinkType>>,
//     Record<"args", PagingInputType>
//   >({
//     query: LINKS,
//     variables: { args: { first: 25 } },
//     fetchPolicy: "no-cache",
//   });
//   error && console.error(error);
//   return !!data ? { props: data.links, revalidate: 5 } : { notFound: true };
// };

export default function HomePage() {
  const [showToast, setShowToast] = useState(false);

  const [fetchLinks, { loading, error, data, fetchMore }] = useLazyQuery<
    Record<"links", CursorConnection<LinkType>>,
    Record<"args", PagingInputType>
  >(LINKS, {
    variables: { args: { first: 25 } },
  });

  const handleMoreLinks = () =>
    data
      ? fetchMore({
          variables: {
            args: { first: 25, after: data?.links.pageInfo.endCursor },
          },
        })
      : fetchLinks();

  // const linkEdges = edges.concat(data?.links?.edges ?? []);

  return (
    <>
      <PageTitle title="home" icon={<MdHome size="35" />} />
      <div className="d-flex justify-content-between align-content-center">
        <h3 className="my-4">
          <MdDynamicFeed size={35} /> Feed
        </h3>
        <div className="my-4">
          <Button>
            <MdAddLink size={35} /> Add Link
          </Button>
        </div>
      </div>
      <Row className="my-4 justify-content-center">
        {!!data?.links.edges.length ? (
          data?.links.edges.map(({ node }) => (
            <Col sm="5" lg="4" key={node.id}>
              <LinkCard key={node.id} {...node} />
            </Col>
          ))
        ) : (
          <>
            <MdShare color="red" size={300} />
            <div className="text-center display-5">
              <p>No feed yet! Be the first.</p>{" "}
              <Link href="/member">Sign/Login</Link>
            </div>
          </>
        )}
      </Row>
      <FeedbackToast error={error} setShow={setShowToast} show={showToast} />
      {data?.links.pageInfo.hasNextPage && (
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
