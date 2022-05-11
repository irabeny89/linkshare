import { LinkCardPropsType } from "types";
import { BiUpvote } from "react-icons/bi";
import { CSSProperties } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { getCompactNumberFormat } from "utils/";

const cardStyle: CSSProperties = { maxWidth: 360, height: 180 };

export default function LinkCard({
  headline,
  user,
  totalUpvotes,
  url,
  createdAt,
}: LinkCardPropsType) {
  const upvotes = getCompactNumberFormat(totalUpvotes),
    days = getCompactNumberFormat(new Date(+createdAt!).getDay());

  return (
    <Card className="mt-4 mb-2 mx-2 p-3 shadow text-center" style={cardStyle}>
      <a href={url} className="text-decoration-none">
        <Card.Subtitle>{headline}</Card.Subtitle>
      </a>
      <p>
        {user?.name} | <BiUpvote /> {upvotes}
      </p>
      <div className="mb-3">Shared {days} days ago</div>
      <Button className="shadow-lg">
        <BiUpvote /> upvote
      </Button>
    </Card>
  );
}
