import { Alert } from "react-bootstrap";
import { MdError } from "react-icons/md";
import { errorMessages } from "config";
import { ErrorPropsType } from "types";

const { pageNotFound404, serverDown500 } = errorMessages.client;

export default function ErrorView({ type }: ErrorPropsType) {
  return (
    <Alert variant="danger" className="border-3 text-center display-5">
      <Alert.Heading>
        {type === "404" && <>4xx - Client Error</>}
        {type === "500" && <>5xx - Server Error</>}
      </Alert.Heading>
      {type === "404" && <p>{pageNotFound404}</p>}
      {type === "500" && <p>{serverDown500}</p>}
      <MdError size={100} />
    </Alert>
  );
}
