import { CSSProperties, ReactNode } from "react";
import Container from "react-bootstrap/Container";
import Footer from "./Footer";
import Header from "./Header";

const mainStyle: CSSProperties = {
  minHeight: "85vh",
  margin: "25px 0",
};

export default function Layout({ children }: Record<"children", ReactNode>) {
  return (
    <Container>
      <Header />
      <main style={mainStyle}>{children}</main>
      <Footer />
    </Container>
  );
}
