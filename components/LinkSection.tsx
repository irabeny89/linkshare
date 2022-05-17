import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useQuery } from "@apollo/client";
import { MY_LINKS } from "apolloGraphql/client/documentNodes";
import { PagingInputType, UserNodeType } from "types";
import LinkCard from "./LinkCard";
import dynamic from "next/dynamic";
import { MdShare } from "react-icons/md";

const Error = dynamic(() => import("components/Error"), {
  loading: () => <>loading...</>,
});

export default function LinkSection() {
  const { loading, error, data } = useQuery<
    Record<"me", Partial<UserNodeType>>,
    Record<"linksArgs", PagingInputType>
  >(MY_LINKS, {
    variables: {
      linksArgs: { first: 25 },
    },
  });

  const links =
    data?.me?.links?.edges.map(({ node }) => ({
      ...node,
      user: { name: "Me" },
    })) ?? [];

  return loading ? (
    <Spinner animation="border" />
  ) : error ? (
    <Error type="500" />
  ) : (
    <Row className="d-flex justify-content-center">
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
  );
}
