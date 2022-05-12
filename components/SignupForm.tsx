import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "apolloGraphql/client/documentNodes";
import { SignupInputType } from "types";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import config from "config";

const {
  siteData: { ACCESS_TOKEN_KEY },
} = config;

export default function SignupForm() {
  const [validated, setValidated] = useState(false),
    router = useRouter();

  const [signup] = useMutation<Record<"signup", string>, SignupInputType>(
    SIGN_UP
  );

  const handleSignup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputs = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as SignupInputType;

    e.currentTarget.checkValidity()
      ? (e.currentTarget.reset(),
        signup({
          variables: inputs,
        }).then(({ data, errors }) => {
          data
            ? (localStorage.setItem(ACCESS_TOKEN_KEY, data?.signup ?? ""),
              router.push("/"))
            : console.error(errors);
        }))
      : e.preventDefault(),
      e.stopPropagation(),
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
        Password is required to be more than 8 characters!
      </Form.Control.Feedback>

      <Button type="submit" className="my-4 border-5 shadow w-100" size="lg">
        Submit
      </Button>
    </Form>
  );
}
