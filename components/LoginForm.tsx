import { FormEvent, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useLazyQuery } from "@apollo/client";
import { LOGIN } from "apolloGraphql/client/documentNodes";
import { LoginInputType } from "types";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import config from "config";

const {
  siteData: { ACCESS_TOKEN_KEY },
} = config;

const FeedbackToast = dynamic(() => import("components/FeedBackToast"), {
  loading: () => <>loading...</>,
});

export default function LoginForm() {
  const [validated, setValidated] = useState(false),
    [showError, setShowError] = useState(false),
    router = useRouter();

  const [login, { loading, error, data }] = useLazyQuery<
    Record<"login", string>,
    LoginInputType
  >(LOGIN);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputs = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as LoginInputType;

    e.currentTarget.checkValidity()
      ? login({
          variables: inputs,
        })
      : e.preventDefault(),
      e.stopPropagation(),
      setValidated(true);
  };

  useEffect(() => {
    data?.login &&
      (localStorage.setItem(ACCESS_TOKEN_KEY, data.login ?? ""),
      router.push("/"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.login]);

  return (
    <Form
      className="my-5"
      noValidate
      validated={validated}
      onSubmit={handleLogin}
    >
      <FeedbackToast error={error} show={showError} setShow={setShowError} />
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

      {loading ? (
        <Spinner animation="grow" />
      ) : (
        <Button type="submit" className="my-4 border-5 shadow w-100" size="lg">
          Submit
        </Button>
      )}
    </Form>
  );
}
