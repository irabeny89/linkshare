import _User from "@/models/User";
import { ApolloError } from "apollo-server-micro";
import {
  GraphContextType,
  LinkModelType,
  PagingInputType,
} from "types";
import { devlog, getCursorConnection, handleErrorInline } from "utils/";

const User = {
  sharedLinks: async (
    { id: userId }: _User,
    args: PagingInputType,
    { Link }: GraphContextType
  ) => {
    try {
      const list = (await Link.findAll({
        where: { userId },
      })) as unknown as Required<LinkModelType>[];

      return getCursorConnection({ list, ...args });
    } catch (error) {
      devlog(error);
    }
  },
  upvotedLinks: async (
    { id: userId }: _User,
    args: PagingInputType,
    { Upvote }: GraphContextType
  ) => {
    try {
      const list = (await Upvote.findAll({
        where: { userId },
      })) as unknown as Required<LinkModelType>[];

      return getCursorConnection({ list, ...args });
    } catch (error) {
      devlog(error);
      handleErrorInline(error, ApolloError, "Server error.")
    }
  },
};

export default User;
