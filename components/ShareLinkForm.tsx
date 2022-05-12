import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { MdShare } from "react-icons/md";
import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { LinkInputType, ShareLinkFormPropsType } from "types";
import { LINKS, SHARE_LINK } from "graphql/documentNodes";
import dynamic from "next/dynamic";

const FeedbackToast = dynamic(() => import("components/FeedBackToast"), {
  loading: () => <>loading...</>,
});

export default function ShareLinkForm({
  setShowModal,
}: ShareLinkFormPropsType) {
  const [validated, setValidated] = useState(false),
    [showError, setShowError] = useState(false);

  const [shareLink, { loading, error }] = useMutation<
    Record<"shareLink", string>,
    LinkInputType
  >(SHARE_LINK);

  const handleShareLink = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputs = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as LinkInputType;

    e.currentTarget.checkValidity()
      ? (shareLink({
          variables: inputs,
          refetchQueries: [LINKS],
        }),
        e.currentTarget.reset(),
        setShowModal(false))
      : e.preventDefault(),
      e.stopPropagation(),
      setValidated(true);
  };

  return (
    <>
      <FeedbackToast error={error} show={showError} setShow={setShowError} />
      <Form
        className="my-3"
        noValidate
        validated={validated}
        onSubmit={handleShareLink}
      >
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
            name="url"
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
            name="headline"
          />
        </Form.FloatingLabel>
        <Form.Control.Feedback type="invalid">
          Headline is required!
        </Form.Control.Feedback>

        {loading ? (
          <Spinner animation="grow" />
        ) : (
          <Button
            type="submit"
            className="my-4 border-5 shadow w-100"
            size="lg"
          >
            <MdShare size={25} /> Submit
          </Button>
        )}
      </Form>
    </>
  );
}
