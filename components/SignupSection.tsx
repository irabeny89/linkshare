import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function SignupSection() {
  const [validated, setValidated] = useState(false);

  return (
    <Row className="justify-content-center">
      <Col md="6">
        <Form className="my-5" noValidate validated={validated}>
          <Form.FloatingLabel
            placeholder="Name"
            label="Name"
            aria-label="name"
            className="my-4 shadow"
          >
            <Form.Control required placeholder="Name" aria-label="name" />
          </Form.FloatingLabel>
          <Form.Control.Feedback type="invalid">
            Name is required!
          </Form.Control.Feedback>

          <Form.FloatingLabel
            placeholder="Email"
            label="Email"
            aria-label="email"
            className="my-4 shadow"
          >
            <Form.Control
              required
              placeholder="Email"
              aria-label="email"
              type="email"
            />
          </Form.FloatingLabel>
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>

          <Form.FloatingLabel
            className="my-4 shadow"
            placeholder="Password(at least 8 characters long)"
            label="Password (+8 characters)"
            aria-label="password"
          >
            <Form.Control
              required
              placeholder="Password(at least 8 characters long)"
              aria-label="password"
              type="password"
              minLength={8}
            />
          </Form.FloatingLabel>
          <Form.Control.Feedback type="invalid">
            Password is required to be more than 8 characters!
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
  );
}
