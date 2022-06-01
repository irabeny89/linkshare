import { useQuery, useReactiveVar } from "@apollo/client";
import { LINKS } from "apolloGraphql/client/documentNodes";
import type {
  CursorConnectionType,
  LinkNodeType,
  PagingInputType,
} from "types";
import { MdHome, MdMore, MdShare, MdDynamicFeed } from "react-icons/md";
import LinkCard from "components/LinkCard";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import dynamic from "next/dynamic";
import PageTitle from "components/PageTitle";
import Link from "next/link";
import { authPayloadVar } from "apolloGraphql/client/reactiveVars";

const FeedbackToast = dynamic(() => import("components/FeedBackToast"), {
    loading: () => <>loading...</>,
  }),
  ErrorView = dynamic(() => import("components/ErrorView"), {
    loading: () => <>loading...</>,
  });

export default function HomePage() {
  const authPayload = useReactiveVar(authPayloadVar);

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
      <PageTitle title="Home" icon={<MdHome size="35" />} />
      <h3 className="my-4">
        <MdDynamicFeed size={35} /> Feed
      </h3>
      <Row className="my-4 justify-content-center">
        {loading ? (
          error ? (
            <ErrorView type="500" />
          ) : (
            <Spinner animation="border" />
          )
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
              {!authPayload?.sub && <Link href="/member">Sign up/Login</Link>}
            </div>
          </>
        )}
      </Row>
      <FeedbackToast error={error} />
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
