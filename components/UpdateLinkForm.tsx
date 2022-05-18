import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { MdShare } from "react-icons/md";
import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { LinkInputType, UpdateLinkFormPropsType } from "types";
import {
  PROFILE,
  LINKS,
  MY_LINKS,
  MY_UPVOTES,
  UPDATE_LINK,
} from "apolloGraphql/client/documentNodes";
import dynamic from "next/dynamic";

const FeedbackToast = dynamic(() => import("components/FeedBackToast"), {
  loading: () => <>loading...</>,
});

export default function UpdateLinkForm({
  setShowModal,
  headline,
  id: linkId,
  url,
}: UpdateLinkFormPropsType) {
  const [validated, setValidated] = useState(false);

  const [updateLink, { loading, error, reset }] = useMutation<
    Record<"updateLink", string>,
    LinkInputType & Record<"linkId", string>
  >(UPDATE_LINK);

  const handleUpdateLink = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputs = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as LinkInputType;

    e.currentTarget.checkValidity()
      ? (updateLink({
          variables: { ...inputs, linkId },
          refetchQueries: [LINKS, MY_LINKS, MY_UPVOTES, PROFILE],
        }),
        setShowModal(false))
      : e.preventDefault(),
      e.stopPropagation(),
      setValidated(true);
  };

  return (
    <>
      <FeedbackToast error={error} reset={reset} />
      <Form
        className="my-3"
        noValidate
        validated={validated}
        onSubmit={handleUpdateLink}
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
            defaultValue={url}
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
            defaultValue={headline}
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
