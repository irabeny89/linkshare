import {
  UserInputError,
  ValidationError,
} from "apollo-server-micro";
import { GraphContextType, LinkInputType, SignupInputType } from "types";
import {
  authenticate,
  devlog,
  handleErrorInline,
  handleErrorThrows,
} from "utils/";

const Mutation = {
  signup: async (_: any, args: SignupInputType, { User }: GraphContextType) => {
    try {
      const user = await User.create(args);

      return await user.getAccessToken();
    } catch (error: any) {
      devlog(error),
        handleErrorInline(
          !!error,
          UserInputError,
          "Check your inputs, they are invalid."
        );
    }
  },
  shareLink: async (
    _: any,
    args: LinkInputType,
    { Link, accessToken }: GraphContextType
  ): Promise<undefined | string> => {
    try {
      const { sub: userId } = await authenticate(accessToken);
      // @ts-ignore
      const { id } = await Link.create({ ...args, userId });

      return `Link shared with id ${id}.`;
    } catch (error: any) {
      const validationError = error.errors[0];
      handleErrorInline(
        validationError,
        ValidationError,
        validationError.message
      );
      handleErrorThrows(error, "ForbiddenError", "Error");
    }
  },
  upvote: async (
    _: any,
    { linkId }: Record<"linkId", string>,
    { Upvote, accessToken }: GraphContextType
  ) => {
    try {
      const { sub: userId } = await authenticate(accessToken),
        upvoted = await Upvote.findOne({
          where: { linkId, userId },
        });

      handleErrorInline(
        upvoted,
        Error,
        "Upvoted before; cannot upvote twice."
      );

      // @ts-ignore
      const { id } = await Upvote.create({ userId, linkId });

      return `Link upvoted with id ${id}.`;
    } catch (error) {
      handleErrorThrows(error, "ForbiddenError", "Error");
    }
  },
};

export default Mutation;