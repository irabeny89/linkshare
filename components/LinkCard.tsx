import { LinkCardPropsType } from "types";
import { BiUpvote } from "react-icons/bi";
import moment from "moment";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { CSSProperties } from "react";

const cardStyle: CSSProperties = { maxWidth: 360 };

export default function FeedCard({
  headline,
  poster: { name },
  upvoters,
  url,
  created_at,
}: LinkCardPropsType) {
  return (
    <Row
      className="mt-4 mb-2 mx-2 p-3 border border border-3 text-center"
      style={cardStyle}
    >
      <a href={url} className="text-decoration-none">
        <h5>{headline}</h5>
      </a>
      <p>
        {name} | <BiUpvote /> {upvoters.length}
      </p>
      <div className="mb-3">Shared {moment(created_at!).fromNow()}</div>
      <Button>
        <BiUpvote /> upvote
      </Button>
    </Row>
  );
}
