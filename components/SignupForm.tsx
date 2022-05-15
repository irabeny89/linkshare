import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { MdWarningAmber } from "react-icons/md";
import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "apolloGraphql/client/documentNodes";
import { SignupInputType } from "types";
import { useRouter } from "next/router";
import config from "config";

const {
  siteData: { ACCESS_TOKEN_KEY },
} = config;

export default function SignupForm() {
  const [validated, setValidated] = useState(false),
    [unMatchMessage, setUnMatchMessage] = useState(""),
    router = useRouter();

  const [signup] = useMutation<Record<"signup", string>, SignupInputType>(
    SIGN_UP
  );

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputs = Object.fromEntries(
        new FormData(e.currentTarget)
      ) as SignupInputType & Record<"confirmPassword", string>,
      isSamePassword = inputs.confirmPassword === inputs.password;

    e.currentTarget.checkValidity() && isSamePassword
      ? (e.currentTarget.reset(),
        setUnMatchMessage(""),
        signup({
          variables: inputs,
        }).then(({ data, errors }) => {
          data
            ? (localStorage.setItem(ACCESS_TOKEN_KEY, data?.signup ?? ""),
              router.push("/dashboard"))
            : console.error(errors);
        }))
      : e.preventDefault(),
      e.stopPropagation(),
      setUnMatchMessage("Passwords do not match."),
      setValidated(true);
  };

  return (
    <Form
      className="my-5"
      noValidate
      validated={validated}
      onSubmit={handleSignup}
    >
      <Form.FloatingLabel
        placeholder="Name"
        label="Name"
        aria-label="name"
        className="my-4 shadow"
      >
        <Form.Control
          className="text-capitalize"
          required
          placeholder="Name"
          aria-label="name"
          name="name"
        />
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
          name="email"
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
          name="password"
        />
      </Form.FloatingLabel>
      <Form.Control.Feedback type="invalid">
        Password is required to be 8 or more characters!
      </Form.Control.Feedback>

      <Form.FloatingLabel
        className="my-4 shadow"
        placeholder="Confirm Password (re-type password)"
        label="Confirm Password (re-type password)"
        aria-label="confirm password"
        onChange={() => setUnMatchMessage("")}
      >
        <Form.Control
          onChange={() => setUnMatchMessage("")}
          required
          placeholder="Confirm Password(re-type password)"
          aria-label="confirmPassword"
          type="confirmPassword"
          minLength={8}
          name="confirmPassword"
        />
      </Form.FloatingLabel>
      <Form.Control.Feedback type="invalid">
        Password is required to be 8 or more characters!
      </Form.Control.Feedback>
      {!!unMatchMessage && (
        <Form.Text className="text-danger">
          <MdWarningAmber size={21} /> {unMatchMessage}
        </Form.Text>
      )}

      <Button type="submit" className="my-4 border-5 shadow w-100" size="lg">
        Submit
      </Button>
    </Form>
  );
}
