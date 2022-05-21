import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import config from "config";
import { FeedbackToastPropsType } from "types";
import { useEffect, useState } from "react";

export default function FeedbackToast({
  error,
  reset,
}: FeedbackToastPropsType) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(!!error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <ToastContainer position="bottom-end">
      <Toast
        bg="danger"
        autohide
        show={show}
        onClose={() => (reset && reset(), setShow(false))}
      >
        <Toast.Header className="justify-content-between">
          {error?.name}
        </Toast.Header>
        <Toast.Body className="text-white text-center">
          {/* {config.siteData.error.client.general} */}
          {error.message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
