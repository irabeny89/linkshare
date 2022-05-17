import {
  CursorConnectionType,
  EdgeType,
  ErrorTypes,
  HashType,
  LinkRecordType,
  PageableNodeType,
  PagingInputType,
  SearchAbleFieldType,
  UserRecordType,
} from "types";
import config from "config";
import { ApolloError, ForbiddenError } from "apollo-server-micro";
import { JwtPayload } from "jsonwebtoken";

const {
  environmentVariable: { secret },
  siteData: {
    error: {
      server: { general },
    },
  },
} = config;

export const getCompactNumberFormat = (value: number = 0) =>
  Intl.NumberFormat("en-US", { notation: "compact" }).format(value);

export const devlog = (error: any) =>
  process.env.NODE_ENV === "development" && console.error(error);

export const handleErrorInline = (
  truthy: any,
  ErrorClass: any,
  errorMessage: string
) => {
  if (truthy) throw new ErrorClass(errorMessage);
};

export const searchList = <T extends SearchAbleFieldType>(
  list: T[],
  searchText: string
): T[] =>
  list.filter(
    (item) =>
      item?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      item?.headline?.toLowerCase().includes(searchText.toLowerCase())
  );

export const getForwardConnection = (
  list: PageableNodeType[],
  first: number,
  after: string | Date | undefined
) => {
  const afterIndex = list.findIndex(({ createdAt }) => createdAt === after),
    edges = list.slice(afterIndex + 1, first + afterIndex + 1).map((node) => ({
      cursor: node.createdAt,
      node,
    })),
    startCursor = edges[0]?.node?.createdAt ?? "",
    endCursor = edges.reverse()[0]?.node?.createdAt ?? "",
    hasNextPage = list.some((item) => item.createdAt > endCursor),
    hasPreviousPage = list.some((item) => item.createdAt < startCursor);

  return {
    edges,
    pageInfo: {
      startCursor,
      endCursor,
      hasNextPage,
      hasPreviousPage,
    },
  };
};

export const getBackwardConnection = (
  list: PageableNodeType[],
  last: number,
  before: string | Date | undefined
) => {
  const beforeIndex = list.findIndex((item) => item.createdAt === before),
    edges = list
      .slice(
        (beforeIndex === -1 ? 0 : beforeIndex) - last,
        beforeIndex === -1 ? undefined : beforeIndex
      )
      .map((node) => ({
        cursor: node.createdAt,
        node,
      })),
    startCursor = edges[0]?.node?.createdAt ?? "",
    endCursor = edges.reverse()[0]?.node?.createdAt ?? "",
    hasNextPage = list.some((item) => item.createdAt > endCursor),
    hasPreviousPage = list.some((item) => item.createdAt < startCursor);

  return {
    edges,
    pageInfo: {
      startCursor,
      endCursor,
      hasNextPage,
      hasPreviousPage,
    },
  };
};

export const getCursorConnection = ({
  list,
  first,
  after,
  last,
  before,
  search,
}: PagingInputType & Record<"list", PageableNodeType[]>) => {
  // searchList returns [] if list is empty
  const _list = search ? searchList<PageableNodeType>(list, search) : list;

  return last
    ? getBackwardConnection(_list, last, before)
    : getForwardConnection(_list, first!, after);
};

export const authenticate = async (accessToken: string | undefined) => {
  // authenticate
  const payload =
    accessToken &&
    (await import("jsonwebtoken")).verify(accessToken, secret, {
      audience: "user" || "admin",
    });

  // throw error if no payload i.e unauthentic
  handleErrorInline(!payload, ForbiddenError, "Not allowed.");

  return payload as JwtPayload;
};

export const throwErrorsFor = (error: any, ...errorNames: ErrorTypes[]) => {
  if (errorNames.includes(error.name)) throw error;
};

export const handleErrorThrows = (error: any, ...errorNames: ErrorTypes[]) => {
  devlog(error);
  errorNames && throwErrorsFor(error, ...errorNames);
  handleErrorInline(error, ApolloError, general);
};
