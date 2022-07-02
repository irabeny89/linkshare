import { MdCode } from "react-icons/md";
import { siteData } from "config";

const { author, email } = siteData;

export default function Footer() {
  return (
    <footer className="text-center">
      <hr />
      {author.split(" ")[0]} <MdCode size={25} color="blue" />{" "}
      {author.split(" ")[1]}
      <p>{email}</p>
    </footer>
  );
}
