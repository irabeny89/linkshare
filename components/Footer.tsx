import { MdCode } from "react-icons/md";
import config from "config";
const {
  siteData: { author },
} = config;
export default function Footer() {
  return (
    <footer className="text-center">
      <hr />
      {author.split(" ")[0]} <MdCode size={25} color="blue" />{" "}
      {author.split(" ")[1]}
    </footer>
  );
}
