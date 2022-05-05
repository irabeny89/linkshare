import { MicroRequest } from "apollo-server-micro/dist/types";
import { NextApiResponse } from "next";
import apolloServer from "graphql/apolloServer";

export const config = { api: { bodyParser: false } };

const server = apolloServer.start();

export default async function handler (req: MicroRequest, res: NextApiResponse) {
  if (req.method === "OPTIONS") {
    return res.send("ok");
  }
  await server;
  return await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}
