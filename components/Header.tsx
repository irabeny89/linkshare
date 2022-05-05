import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { MdShare } from "react-icons/md";
import config from "config";
import Link from "next/link";

const {
  siteData: { name, pages },
} = config;

export default function Header() {
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
            {pages.map(({ href, title }) => (
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
