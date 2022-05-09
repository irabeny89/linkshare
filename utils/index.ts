import {
  CursorConnectionType,
  EdgeType,
  PagingInputType,
  SearchAbleFieldType,
} from "types";
import config from "config";

const {
  environmentVariable: { secret },
} = config;

export const getCompactNumberFormat = (value: number) =>
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

export const getAuthPayload = async (accessToken: string | undefined) =>
  accessToken &&
  (await import("jsonwebtoken")).verify(accessToken, secret, {
    audience: "user" || "admin",
  });

export const searchList = <T extends SearchAbleFieldType>(
  list: T[],
  searchText: string
): T[] =>
  list.filter(
    (item) =>
      item?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
      item?.headline?.toLowerCase().includes(searchText.toLowerCase())
  );

export const getCursorConnection = <
  T extends Record<"createdAt", Date | string> & SearchAbleFieldType
>({
  list,
  first,
  after,
  last,
  before,
  search,
}: PagingInputType & Record<"list", T[]>): CursorConnectionType<T> => {
  let edges: EdgeType<T>[] = [],
    startCursor: Date | string = "",
    endCursor: Date | string = "",
    hasNextPage: boolean = false,
    hasPreviousPage: boolean = false;
  // if search is requested...
  const _list = search ? searchList<T>(list, search) : list;

  if (first) {
    const afterIndex = _list.findIndex((item) => item.createdAt === after);
    // create edges with cursor
    edges = _list.slice(afterIndex + 1, first + afterIndex + 1).map((item) => ({
      cursor: item.createdAt,
      node: item,
    }));
    // paging info
    startCursor = edges[0]?.node?.createdAt ?? "";
    endCursor = edges.reverse()[0]?.node?.createdAt ?? "";
    hasNextPage = _list.some((item) => item.createdAt > endCursor);
    hasPreviousPage = list.some((item) => item.createdAt < startCursor);
  }
  if (last) {
    const beforeIndex = _list.findIndex((item) => item.createdAt === before);
    // create edges with cursor
    edges = _list
      .slice(
        (beforeIndex === -1 ? 0 : beforeIndex) - last,
        beforeIndex === -1 ? undefined : beforeIndex
      )
      .map((item) => ({
        cursor: item.createdAt,
        node: item,
      }));
    // paging info
    startCursor = edges[0]?.node?.createdAt ?? "";
    endCursor = edges.reverse()[0]?.node?.createdAt ?? "";
    hasNextPage = _list.some((item) => item.createdAt > endCursor);
    hasPreviousPage = _list.some((item) => item.createdAt < startCursor);
  }

  return {
    edges: edges.reverse(),
    pageInfo: {
      startCursor: startCursor.toString(),
      endCursor: endCursor.toString(),
      hasPreviousPage,
      hasNextPage,
    },
  };
};
