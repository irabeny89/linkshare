import Button from "react-bootstrap/Button";
import Head from "next/head";
import { PageTitlePropsType } from "types";

export default function PageTitle({ title, icon }: PageTitlePropsType) {
  return (
    <>
      <Head>
        <title className="text-capitalize">{title}</title>
      </Head>
      <div className="d-flex justify-content-between">
        <div>
          <h2 className="text-capitalize">
            <>
              {icon} {title}
            </>
          </h2>
        </div>
        <div>
          <Button variant="outline-danger" className="shadow border-2">
            Logout
          </Button>
        </div>
      </div>
      <hr />
    </>
  );
}
