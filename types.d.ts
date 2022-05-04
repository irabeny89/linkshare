import { NextApiRequest, NextApiResponse } from "next";
import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";

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

type UserVertexType = Optional<
  {
    sharedLinks: Link[];
    upvotedLinks: Link[];
  } & Omit<UserType, "password">
>;

type LinkType = {
  headline: string;
  url: string;
  poster: UserType;
  upvoters: string[];
} & TimestampsAndId;

type LinkVertexType = Optional<LinkType>;

type PagingInputType = {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
  order?: "ASCEND" | "DESCEND";
};

type PageInfoType = {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type EdgeType<NodeType> = {
  cursor: string;
  node: NodeType;
};

type CursorConnection<NodeType> = {
  edges: EdgeType<NodeType>[];
  pageInfo: PageInfoType;
};

type GraphContextType = {
  req: NextApiRequest;
  res: NextApiResponse;
};

type ErrorPropsType = {
  type: "404" | "500";
};

type LinkCardPropsType = LinkType;

type FeedbackToastPropsType = {
  error: any;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

type PageTitlePropsType = {
  title: string;
  icon?: unknown;
};
