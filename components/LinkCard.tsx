import { LinkCardPropsType } from "types";
import { BiUpvote } from "react-icons/bi";
import moment from "moment";
import { CSSProperties } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getCompactNumberFormat } from "utils/";

const cardStyle: CSSProperties = { maxWidth: 360 };

export default function FeedCard({
  headline,
  poster: { name },
  upvoters,
  url,
  created_at,
}: LinkCardPropsType) {
  const upvotes = getCompactNumberFormat(upvoters.length);

  return (
    <Card className="mt-4 mb-2 mx-2 p-3 shadow text-center" style={cardStyle}>
      <a href={url} className="text-decoration-none">
        <Card.Subtitle>{headline}</Card.Subtitle>
      </a>
      <p>
        {name} | <BiUpvote /> {upvotes}
      </p>
      <div className="mb-3">Shared {moment(created_at!).fromNow()}</div>
      <Button>
        <BiUpvote /> upvote
      </Button>
    </Card>
  );
}
