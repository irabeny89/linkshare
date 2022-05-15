import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import PageTitle from "components/PageTitle";
import { MdDashboard } from "react-icons/md";
import ProfileSection from "components/ProfileSection";

export default function DashboardPage() {
  return (
    <>
      <PageTitle title="Dashboard" icon={<MdDashboard size="35" />} />

      <Tabs defaultActiveKey="profile" variant="pills">
        <Tab eventKey="profile" title="Profile">
          <ProfileSection />
        </Tab>
        <Tab eventKey="links" title="Links"></Tab>
        <Tab eventKey="upvotes" title="Upvotes"></Tab>
      </Tabs>
    </>
  );
}

DashboardPage.displayName = "dashboard";
DashboardPage.audiences = ["user", "admin"];
