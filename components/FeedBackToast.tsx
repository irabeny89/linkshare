import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import config from "config";
import { FeedbackToastPropsType } from "types";
import { useEffect } from "react";

export default function FeedbackToast({
  error,
  show,
  setShow,
}: FeedbackToastPropsType) {
  useEffect(() => {
    setShow(!!error);
  }, [error, setShow]);
  
  return (
    <ToastContainer position="bottom-end">
      <Toast bg="danger" autohide show={show} onClose={() => setShow(false)}>
        <Toast.Header className="justify-content-between">
          {error?.name}
        </Toast.Header>
        <Toast.Body className="text-white text-center">
          {config.siteData.error.general}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
