import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useQuery } from "@apollo/client";
import { MY_LINKS } from "apolloGraphql/client/documentNodes";
import { PagingInputType, UserNodeType } from "types";
import LinkCard from "./LinkCard";
import dynamic from "next/dynamic";
import { MdAddLink, MdShare, MdMore } from "react-icons/md";
import { useState } from "react";

const Error = dynamic(() => import("components/Error"), {
    loading: () => <>loading...</>,
  }),
  ShareLinkModal = dynamic(() => import("components/ShareLinkModal"), {
    loading: () => <>loading...</>,
  }),
  FeedbackToast = dynamic(() => import("components/FeedBackToast"), {
    loading: () => <>loading...</>,
  });

export default function LinkSection() {
  const [showModal, setShowModal] = useState(false);

  const { loading, error, data, fetchMore } = useQuery<
    Record<"me", Partial<UserNodeType>>,
    Record<"linksArgs", PagingInputType>
  >(MY_LINKS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      linksArgs: { first: 25 },
    },
  });

  const links =
    data?.me?.links?.edges.map(({ node }) => ({
      ...node,
      user: { name: "Me" },
    })) ?? [];

  const handleMoreLinks = () =>
    fetchMore({
      variables: {
        linksArgs: { first: 25, after: data?.me.links?.pageInfo?.endCursor },
      },
    });

  return loading ? (
    <Spinner animation="border" />
  ) : error ? (
    <Error type="500" />
  ) : (
    <>
      <FeedbackToast error={error} />
      <Row className="d-flex justify-content-center">
        <ShareLinkModal show={showModal} setShow={setShowModal} />
        <div className="my-5">
          <Button onClick={() => setShowModal(true)} className="shadow">
            <MdAddLink size={35} /> Share Link
          </Button>
        </div>
        {data?.me?.totalLinks ? (
          links.map((link) => (
            <Col sm="5" lg="4" key={link.id}>
              <LinkCard {...link} />
            </Col>
          ))
        ) : (
          <>
            <MdShare color="red" size={300} />
            <div className="text-center display-5">
              <p>You have no shared link yet!</p>
            </div>
          </>
        )}
      </Row>
      {data?.me.links?.pageInfo.hasNextPage && (
        <Row className="my-4">
          <Col>
            {loading ? (
              <Spinner animation="grow" />
            ) : (
              <Button className="shadow" onClick={handleMoreLinks}>
                <MdMore /> more links
              </Button>
            )}
          </Col>
        </Row>
      )}
    </>
  );
}
