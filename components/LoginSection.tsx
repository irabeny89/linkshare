import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginForm from "./LoginForm";

export default function LoginSection() {
  return (
    <Row className="justify-content-center">
      <Col md="6">
        <LoginForm />
      </Col>
    </Row>
  );
}
