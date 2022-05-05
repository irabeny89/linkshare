import PageTitle from "components/PageTitle";
import { MdOutlineVerifiedUser } from "react-icons/md";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import LoginSection from "components/LoginSection";
import SignupSection from "components/SignupSection";

export default function MemberPage() {
  return (
    <>
      <PageTitle icon={<MdOutlineVerifiedUser size={35} />} title="Member" />
      <Tabs defaultActiveKey="login" variant="pills">
        <Tab title={<h3>Login</h3>} eventKey="login">
          <LoginSection />
        </Tab>
        <Tab title={<h3>Sign up</h3>} eventKey="signup">
          <SignupSection />
        </Tab>
      </Tabs>
    </>
  );
}
