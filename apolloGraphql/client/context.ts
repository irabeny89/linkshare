import { ContextFunction } from "apollo-server-core";
import { GraphContextType } from "types";
import User from "@/models/User";
import Link from "@/models/Link";
import Upvote from "@/models/Upvote";
import { NextApiRequest } from "next";

const context: object | ContextFunction<any, object> | undefined = async ({
  req: {
    headers: { authorization },
  },
}: Record<"req", NextApiRequest>): Promise<GraphContextType> => ({
  accessToken: authorization?.replace("Bearer ", ""),
  User,
  Link,
  Upvote,
});

export default context;
