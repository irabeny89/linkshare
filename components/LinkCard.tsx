import { LinkCardPropsType } from "types";
import { BiUpvote, BiEditAlt, BiTrash } from "react-icons/bi";
import { CSSProperties, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getCompactNumberFormat } from "utils/";
import { useMutation, useReactiveVar } from "@apollo/client";
import {
  LINKS,
  MY_LINKS,
  MY_UPVOTES,
  PROFILE,
  UPVOTE,
} from "apolloGraphql/client/documentNodes";
import { authPayloadVar } from "apolloGraphql/client/reactiveVars";
import dynamic from "next/dynamic";

const FeedbackToast = dynamic(() => import("components/FeedBackToast"), {
    loading: () => <>loading...</>,
  }),
  UpdateLinkModal = dynamic(() => import("components/UpdateLinkModal"), {
    loading: () => <>loading...</>,
  }),
  DeleteLinkModal = dynamic(() => import("components/DeleteLinkModal"), {
    loading: () => <>loading...</>,
  });

const cardStyle: CSSProperties = { maxWidth: 360, height: 180 };

export default function LinkCard({
  id,
  headline,
  user,
  totalUpvotes,
  url,
  upvotersId,
  createdAt,
}: LinkCardPropsType) {
  const [showUpdateModal, setShowUpdateModal] = useState(false),
    [showDeleteModal, setShowDeleteModal] = useState(false);

  const [upvote, { error, reset }] = useMutation<
    Record<"upvote", string>,
    Record<"linkId", string>
  >(UPVOTE, {
    variables: { linkId: id! },
    refetchQueries: [LINKS, PROFILE, MY_LINKS, MY_UPVOTES],
  });

  const authPayload = useReactiveVar(authPayloadVar),
    isPermitted = authPayload?.sub === user?.id,
    showUpdateButton =
      isPermitted && upvotersId && !upvotersId.includes(authPayload?.sub!),
    upvotes = getCompactNumberFormat(totalUpvotes),
    days = getCompactNumberFormat(
      Math.floor((Date.now() - +createdAt!) / 864e5)
    ),
    datePhrase =
      +days < 1 ? "Shared today" : `Shared ${days} day${+days > 1 ? "s" : ""} ago`;

  return (
    <Card className="mt-4 mb-2 mx-2 p-3 shadow text-center" style={cardStyle}>
      <FeedbackToast error={error} reset={reset} />
      <DeleteLinkModal
        id={id!}
        show={showDeleteModal}
        setShow={setShowDeleteModal}
      />
      <UpdateLinkModal
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        id={id!}
        url={url!}
        headline={headline!}
      />
      <a href={url} className="text-decoration-none text-capitalize">
        <Card.Subtitle>{headline}</Card.Subtitle>
      </a>
      <p>
        {user?.name} | <BiUpvote /> {upvotes}
      </p>
      <div className="mb-3">{datePhrase}</div>

      {isPermitted && (
        <Row>
          <Col>
            <Button
              size="sm"
              variant="outline-danger"
              className="shadow-lg"
              onClick={() => setShowDeleteModal(true)}
            >
              <BiTrash /> delete
            </Button>
          </Col>
          <Col>
            <Button
              size="sm"
              variant="outline-secondary"
              className="shadow-lg"
              onClick={() => setShowUpdateModal(true)}
            >
              <BiEditAlt /> update
            </Button>
          </Col>
          {showUpdateButton && (
            <Col>
              <Button
                size="sm"
                variant="outline-primary"
                className="shadow-lg"
                onClick={() => upvote()}
              >
                <BiUpvote /> upvote
              </Button>
            </Col>
          )}
        </Row>
      )}
    </Card>
  );
}
