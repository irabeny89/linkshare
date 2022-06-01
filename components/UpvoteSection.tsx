import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useQuery } from "@apollo/client";
import { MY_UPVOTES } from "apolloGraphql/client/documentNodes";
import { PagingInputType, UserNodeType } from "types";
import dynamic from "next/dynamic";
import LinkCard from "./LinkCard";
import { MdMore, MdShare } from "react-icons/md";

const ErrorView = dynamic(() => import("components/ErrorView"), {
  loading: () => <>loading...</>,
});

export default function UpvoteSection() {
  const { loading, error, data, fetchMore } = useQuery<
    Record<"me", Partial<UserNodeType>>,
    Record<"upvotedLinksArgs", PagingInputType>
  >(MY_UPVOTES, {
    variables: {
      upvotedLinksArgs: { first: 25 },
    },
  });

  const handleMoreLinks = () =>
    fetchMore({
      variables: {
        upvotedLinksArgs: {
          first: 25,
          after: data?.me.upvotedLinks?.pageInfo?.endCursor,
        },
      },
    });

  return loading ? (
    <Spinner animation="border" />
  ) : error ? (
    <ErrorView type="500" />
  ) : (
    <>
      <Row className="d-flex justify-content-center">
        {data?.me.totalUpvotes ? (
          data?.me?.upvotedLinks?.edges.map(({ node }) => (
            <Col sm="5" lg="4" key={node.id}>
              <LinkCard {...node} />
            </Col>
          ))
        ) : (
          <>
            <MdShare color="red" size={300} />
            <div className="text-center display-5">
              <p>You have no upvoted link yet!</p>
            </div>
          </>
        )}
      </Row>
      {data?.me?.upvotedLinks?.pageInfo.hasNextPage && (
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
