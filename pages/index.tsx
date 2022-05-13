import { useQuery } from "@apollo/client";
import { LINKS } from "apolloGraphql/client/documentNodes";
import type {
  CursorConnectionType,
  LinkNodeType,
  PagingInputType,
} from "types";
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
import config from "config";

const {
  siteData: { ACCESS_TOKEN_KEY },
} = config;

const FeedbackToast = dynamic(() => import("components/FeedBackToast"), {
    loading: () => <>loading...</>,
  }),
  ShareLinkModal = dynamic(() => import("components/ShareLinkModal"), {
    loading: () => <>loading...</>,
  });

export default function HomePage() {
  const [showToast, setShowToast] = useState(false),
    [showModal, setShowModal] = useState(false);

  const { loading, error, data, fetchMore } = useQuery<
    Record<"links", CursorConnectionType<LinkNodeType>>,
    Record<"args", PagingInputType>
  >(LINKS, {
    variables: { args: { first: 25 } },
    notifyOnNetworkStatusChange: true,
  });

  const handleMoreLinks = () =>
    fetchMore({
      variables: {
        args: { first: 25, after: data?.links?.pageInfo?.endCursor },
      },
    });

  return (
    <>
      <PageTitle title="home" icon={<MdHome size="35" />} />
      <div className="d-flex justify-content-between align-content-center">
        <h3 className="my-4">
          <MdDynamicFeed size={35} /> Feed
        </h3>
        <ShareLinkModal show={showModal} setShow={setShowModal} />
        <div className="my-4">
          <Button onClick={() => setShowModal(true)}>
            <MdAddLink size={35} /> Share Link
          </Button>
        </div>
      </div>
      <Row className="my-4 justify-content-center">
        {loading ? (
          <Spinner animation="border" />
        ) : !!data?.links?.edges?.length ? (
          data?.links?.edges?.map(({ node }) => (
            <Col sm="5" lg="4" key={node.id}>
              <LinkCard {...node} />
            </Col>
          ))
        ) : (
          <>
            <MdShare color="red" size={300} />
            <div className="text-center display-5">
              <p>No feed yet! Be the first.</p>{" "}
              {!localStorage.getItem(ACCESS_TOKEN_KEY) && (
                <Link href="/member">Sign/Login</Link>
              )}
            </div>
          </>
        )}
      </Row>
      <FeedbackToast error={error} setShow={setShowToast} show={showToast} />
      {data?.links?.pageInfo?.hasNextPage && (
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
