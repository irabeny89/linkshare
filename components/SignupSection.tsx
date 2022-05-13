import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SignupForm from "./SignupForm";

export default function SignupSection() {
  return (
    <Row className="justify-content-center">
      <Col md="6">
        <SignupForm />
      </Col>
    </Row>
  );
}
