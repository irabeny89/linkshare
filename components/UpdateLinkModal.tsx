import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { UpdateLinkModalPropsType } from "types";
import UpdateLinkForm from "./UpdateLinkForm";

export default function UpdateLinkModal({
  show,
  setShow,
  ...linkProps
}: UpdateLinkModalPropsType) {
  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Modal.Header closeButton>
        <h3>Update Link</h3>
      </Modal.Header>
      <Modal.Body>
        <Row className="justify-content-center">
          <Col md="6">
            <UpdateLinkForm setShowModal={setShow} {...linkProps} />
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
