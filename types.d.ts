import { NextApiRequest, NextApiResponse } from "next";

type TimestampsAndId = {
  id: number;
  created_at?: string;
  updated_at?: string;
};

type UserType = {
  name: string;
  email: string;
  password: string;
} & TimestampsAndId;

type UserVertexType = {
  sharedLinks: Link[];
  upvotedLinks: Link[];
} & Omit<UserType, "password">;

type LinkType = {
  headline: string;
  url: string;
  poster: UserType;
  upvoters: string[];
} & TimestampsAndId;

type LinkVertexType = LinkType;

type PagingInput = {
  first?: number
  after?: string
  last?: number
  before?: string
  order?: "ASCEND" | "DESCEND"
}

type PageInfoType = {
  startCursor: string
  endCursor: string
  hasNextPage: boolean
  hasPreviousPage: boolean
}

type EdgeType<T> = {
  cursor: string
  node: T
}

type CursorConnection<EdgeType> = {
  edges: EdgeType[]
  pageInfo: PageInfoType
}

type GraphContextType = {
  req: NextApiRequest;
  res: NextApiResponse;
};

