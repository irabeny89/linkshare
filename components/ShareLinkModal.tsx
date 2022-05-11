import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { ShareLinkModalPropsType } from "types";
import ShareLinkForm from "./ShareLinkForm";

export default function ShareLinkModal({
  show,
  setShow,
}: ShareLinkModalPropsType) {
  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Modal.Header closeButton>
        <h3>Share Link</h3>
      </Modal.Header>
      <Modal.Body>
        <Row className="justify-content-center">
          <Col md="6">
            <ShareLinkForm setShowModal={setShow} />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
