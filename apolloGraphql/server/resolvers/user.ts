import _User from "@/models/User";
import {
  GraphContextType,
  LinkRecordType,
  PagingInputType,
  UpvoteModelType,
  UserRecordType,
} from "types";
import { getCursorConnection, handleErrorThrows } from "utils/";

const User = {
  links: async (
    { links: list }: _User,
    { args }: Record<"args", PagingInputType>
  ) => {
    try {
      return getCursorConnection({ list, ...args });
    } catch (error) {
      handleErrorThrows(error);
    }
  },
  upvotedLinks: async (
    { upvotes }: _User,
    { args }: Record<"args", PagingInputType>,
    { Link }: GraphContextType
  ) => {
    try {
      let list: (LinkRecordType &
        Record<"user", UserRecordType> &
        Record<"totalUpvotes", number> &
        Record<"upvotersId", string[]>)[] = [];

      for (const upvote of upvotes) {
        const link = (
            await Link.findByPk(upvote.linkId, {
              include: ["user", "upvotes"],
            })
          )?.toJSON() as LinkRecordType &
            Record<"user", UserRecordType> &
            Partial<Record<"upvotes", Required<UpvoteModelType>[]>>,
          totalUpvotes = link.upvotes!.length,
          upvotersId = link.upvotes!.map(({ userId }) => userId);

        delete link.user.hashedPassword,
          delete link.user.salt,
          delete link.upvotes;

        list.push({
          ...link,
          totalUpvotes,
          upvotersId,
        });
      }

      return getCursorConnection({ list, ...args });
    } catch (error) {
      handleErrorThrows(error);
    }
  },
};

export default User;
