import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { MdShare } from "react-icons/md";
import { siteData } from "config";
import Link from "next/link";
import { useReactiveVar } from "@apollo/client";
import { authPayloadVar } from "apolloGraphql/client/reactiveVars";
import { useState, useEffect } from "react";

const { name, pages } = siteData;

export default function Header() {
  const [permittedData, setPermittedData] = useState<typeof pages>([]);

  const authPayload = useReactiveVar(authPayloadVar);

  useEffect(
    () =>
      setPermittedData(
        authPayload?.sub
          ? pages
          : pages.filter(({ title }) => title.toLowerCase() !== "dashboard")
      ),
    [authPayload?.sub]
  );

  return (
    <header>
      <Navbar collapseOnSelect expand="sm">
        <Link passHref href="/">
          <Navbar.Brand as="h1" className="text-danger">
            <MdShare color="green" size={30} /> {name}
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {permittedData.map(({ href, title }) => (
              <Nav.Item key={title} className="mx-3">
                <Link passHref href={href}>
                  <Nav.Link>{title}</Nav.Link>
                </Link>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
