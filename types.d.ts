import User from "@/models/User";
import Link from "@/models/Link";
import Upvote from "@/models/Upvote";
import { NextApiRequest, NextApiResponse } from "next";
import { Dispatch, SetStateAction } from "react";
import { IconType } from "react-icons";

type UseStateType = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

type SearchAbleFieldType = Partial<Record<"name" | "headline", string>>;

type TimestampsAndIdType = {
  id?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

type SignupInputType = Record<"name" | "email" | "password", string>;

type HashType = Partial<Record<"hashedPassword" | "salt", string>>;

type UserModelType = SignupInputType & HashType & TimestampsAndIdType;

type UserNodeType = Omit<SignupInputType, "password"> &
  Required<TimestampsAndIdType> &
  Record<"links" | "upvotes", CursorConnectionType>;

type UserType = {
  name: string;
  email: string;
  password: string;
  salt: string;
} & TimestampsAndIdType;

type UserRecordType = Partial<HashType & Pick<SignupInputType, "password">> &
  Omit<SignupInputType, "password"> &
  Omit<UserNodeType, "links" | "upvotes"> &
  Record<"links" | "upvotes", Required<LinkModelType>[]>;

type LinkInputType = {
  url: string;
  headline: string;
};

type LinkModelType = LinkInputType &
  TimestampsAndIdType &
  Partial<Record<"userId", string>>;

type LinkNodeType = Required<TimestampsAndIdType> &
  LinkInputType &
  Record<"poster", UserNodeType> &
  Record<"upvoters", string[]>;

type LinkRecordType = Required<LinkModelType>;

type UpvoteModelType = Partial<Record<"userId" | "linkId", string>> &
  TimestampsAndIdType;

type PageableNodeType =
  | Omit<UserRecordType, keyof HashType | "password">
  | LinkRecordType;

type PagingInputType = {
  first?: number;
  after?: string;
  last?: number;
  before?: string;
  search?: string;
};

type PageInfoType = {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

type EdgeType<NodeType> = {
  cursor: string | Date;
  node: NodeType;
};

type CursorConnectionType<NodeType> = {
  edges: EdgeType<NodeType>[];
  pageInfo: PageInfoType;
};

type GraphContextType = {
  accessToken?: string;
  User: typeof User;
  Link: typeof Link;
  Upvote: typeof Upvote;
};

type ErrorPropsType = {
  type: "404" | "500";
};

type LinkCardPropsType = LinkType;

type FeedbackToastPropsType = {
  error: any;
} & UseStateType;

type PageTitlePropsType = {
  title: string;
  icon?: unknown;
};

type AddLinkModalPropsType = UseStateType;
