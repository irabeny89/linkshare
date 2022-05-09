import { Alert } from "react-bootstrap";
import { MdError } from "react-icons/md";
import config from "config";
import { ErrorPropsType } from "types";

export default function Error({ type }: ErrorPropsType) {
  return (
    <Alert variant="danger" className="border-3 text-center display-5">
      <Alert.Heading>
        {type === "404" && <>4xx - Client Error</>}
        {type === "500" && <>5xx - Server Error</>}
      </Alert.Heading>
      {type === "404" && <p>{config.siteData.error.client.pageNotFound}</p>}
      {type === "500" && <p>{config.siteData.error.client.serverDown}</p>}
      <MdError size={100} />
    </Alert>
  );
}
