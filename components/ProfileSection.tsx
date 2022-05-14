import Spinner from "react-bootstrap/Spinner";
import { MdEmail, MdShare } from "react-icons/md";
import { BiUpvote, BiUser, BiRegistered } from "react-icons/bi";
import { useQuery } from "@apollo/client";
import { PROFILE } from "apolloGraphql/client/documentNodes";
import { UserProfileType } from "types";
import Error from "./Error";
import { getCompactNumberFormat } from "utils";

export default function ProfileSection() {
  const { loading, error, data } = useQuery<Record<"me", UserProfileType>>(
    PROFILE,
    {
      variables: {
        linksArgs: { first: 25 },
        upvotedLinksArgs: { first: 25 },
      },
    }
  );

  return loading ? (
    error ? (
      <Error type="500" />
    ) : (
      <Spinner animation="border" />
    )
  ) : (
    <>
      <dl className="text-capitalize mt-5">
        <dt>
          <BiUser size={23} color="green" /> name
        </dt>
        <dd>{data?.me.name}</dd>
        <br />
        <dt>
          <MdEmail size={23} color="green" /> email
        </dt>
        <dd>{data?.me.email}</dd>
        <br />
        <dt>
          <MdShare size={23} color="green" /> total links
        </dt>
        <dd>{getCompactNumberFormat(data?.me.totalLinks)}</dd>
        <br />
        <dt>
          <BiUpvote size={23} color="green" /> total upvotes
        </dt>
        <dd>{getCompactNumberFormat(data?.me.totalUpvotes)}</dd>
        <br />
        <dt>
          <BiRegistered size={23} color="green" /> Joined since
        </dt>
        <dd>{new Date(+data?.me.createdAt!).toDateString()}</dd>
        <br />
      </dl>
    </>
  );
}
