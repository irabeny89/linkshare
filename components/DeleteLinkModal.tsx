import { useMutation } from "@apollo/client";
import {
  DELETE_LINK,
  LINKS,
  MY_LINKS,
  MY_UPVOTES,
  PROFILE,
} from "apolloGraphql/client/documentNodes";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { DeleteLinkModalPropsType } from "types";

const FeedBackToast = dynamic(() => import("components/FeedBackToast"), {
  loading: () => <>loading...</>,
});

export default function DeleteLinkModal({
  show,
  setShow,
  id: linkId,
}: DeleteLinkModalPropsType) {
  const [deleteLink, { loading, error, reset }] = useMutation<
    Record<"deleteLink", string>,
    Record<"linkId", string>
  >(DELETE_LINK, {
    refetchQueries: [LINKS, MY_LINKS, MY_UPVOTES, PROFILE],
    variables: { linkId },
  });
  return (
    <Modal show={show} onHide={() => setShow(false)} size="sm">
      <FeedBackToast error={error} reset={reset} />
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Delete Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure? This cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => (deleteLink(), setShow(false))}
          >
            {loading && <Spinner animation="grow" />} Delete
          </Button>
          <Button variant="light" onClick={() => setShow(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
