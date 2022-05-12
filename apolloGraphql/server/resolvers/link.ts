import { GraphContextType, LinkNodeType, UpvoteModelType } from "types";
import { handleErrorThrows } from "utils";

const Link = {
  totalUpvotes: async (
    { id: linkId }: LinkNodeType,
    _: any,
    { Upvote }: GraphContextType
  ) => {
    try {
      const upvotes = await Upvote.findAll({
        where: {
          linkId,
        },
      });

      return upvotes.length;
    } catch (error) {
      handleErrorThrows(error);
    }
  },
  upvotersId: async (
    { id: linkId }: LinkNodeType,
    _: any,
    { Upvote }: GraphContextType
  ) => {
    try {
      const upvotes = await Upvote.findAll({
        where: {
          linkId,
        },
      }) as UpvoteModelType[];

      return upvotes.map(({ userId }) => userId)
    } catch (error) {
      handleErrorThrows(error);
    }
  },
};

export default Link;
