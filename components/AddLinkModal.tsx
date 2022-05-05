import { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AddLinkModalPropsType } from "types";

export default function AddLinkModal({ show, setShow }: AddLinkModalPropsType) {
  const [validated, setValidated] = useState(false);

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
      <Modal.Header closeButton>
        <h3>Share Link</h3>
      </Modal.Header>
      <Modal.Body>
        <Row className="justify-content-center">
          <Col md="6">
            <Form className="my-3" noValidate validated={validated}>
              <Form.FloatingLabel
                placeholder="URL"
                label="URL"
                aria-label="URL"
                className="my-4 shadow"
              >
                <Form.Control
                  required
                  placeholder="URL"
                  aria-label="URL"
                  type="url"
                />
              </Form.FloatingLabel>
              <Form.Control.Feedback type="invalid">
                URL is required!
              </Form.Control.Feedback>

              <Form.FloatingLabel
                className="my-4 shadow"
                placeholder="Headline"
                label="Headline"
                aria-label="headline"
              >
                <Form.Control
                  required
                  placeholder="Headline"
                  aria-label="headline"
                  minLength={8}
                />
              </Form.FloatingLabel>
              <Form.Control.Feedback type="invalid">
                Headline is required!
              </Form.Control.Feedback>

              <Button
                type="submit"
                className="my-4 border-5 shadow w-100"
                size="lg"
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
