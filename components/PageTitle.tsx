import Button from "react-bootstrap/Button";
import Head from "next/head";
import { PageTitlePropsType } from "types";
import config from "config";

const {
  siteData: { ACCESS_TOKEN_KEY },
} = config;

export default function PageTitle({ title, icon }: PageTitlePropsType) {
  const logout = () => localStorage.removeItem(ACCESS_TOKEN_KEY);

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
          <Button
            variant="outline-danger"
            className="shadow border-2"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
      <hr />
    </>
  );
}
