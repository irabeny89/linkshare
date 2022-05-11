import { ApolloError } from "apollo-server-core";
import {
  GraphContextType,
  LinkRecordType,
  PagingInputType,
  UpvoteModelType,
  UserRecordType,
} from "types";
import {
  authenticate,
  getCursorConnection,
  handleErrorInline,
  handleErrorThrows,
} from "utils/";
import moment from "moment";

const Query = {
  me: async (_: any, __: any, { User, accessToken }: GraphContextType) => {
    try {
      // authenticate
      const { sub } = await authenticate(accessToken);

      const user = (
        await User.findByPk(sub, { include: ["links", "upvotes"] })
      )?.toJSON() as UserRecordType;

      handleErrorInline(!user, ApolloError, "User not found.");

      delete user.password, delete user.salt, delete user.hashedPassword;

      return {
        ...user,
        totalLinks: user.links.length,
        totalUpvotes: user.upvotes.length,
        createdAt: moment(user.createdAt).fromNow(),
      };
    } catch (error: any) {
      handleErrorThrows(error, "ForbiddenError", "ApolloError");
    }
  },
  links: async (
    _: any,
    { args }: Record<"args", PagingInputType>,
    { Link }: GraphContextType
  ) => {
    try {
      const list = (
        await Link.findAll({
          include: ["user", "upvotes"],
        })
      ).map((rawLink) => {
        const link = rawLink.toJSON() as LinkRecordType &
          Record<"upvotes", UpvoteModelType[]> &
          Record<
            "user",
            Omit<UserRecordType, "links" | "upvotes" | "password">
          >;

        delete link.user.hashedPassword, delete link.user.salt;

        return { ...link, totalUpvotes: link.upvotes.length };
      });

      return getCursorConnection({ list, ...args });
    } catch (error) {
      handleErrorThrows(error, "ForbiddenError");
    }
  },
};

export default Query;
