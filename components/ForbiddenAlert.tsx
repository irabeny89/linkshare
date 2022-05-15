import Alert from "react-bootstrap/Alert";
import PageTitle from "./PageTitle";
import { VscUnverified } from "react-icons/vsc";
import Link from "next/link";

export default function ForbiddenAlert() {
  return (
    <Alert variant="danger">
      <PageTitle title="Forbidden" icon={<VscUnverified size={30} />} />

      <div className="d-flex justify-content-center">
        <div>
          <VscUnverified size={250} />
        </div>
      </div>
      <p className="text-center">
        <Link href="/">Go to home page</Link>
      </p>
    </Alert>
  );
}
