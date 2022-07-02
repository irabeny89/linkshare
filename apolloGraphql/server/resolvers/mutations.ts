import {
  ForbiddenError,
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
import { errorMessages } from "config";

const { forbidden403 } = errorMessages.server;

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
      const { sub: userId } = await authenticate(accessToken);

      const upvoted = await Upvote.findOne({
        where: { linkId, userId },
      });

      handleErrorInline(upvoted, Error, "Upvoted before; cannot upvote twice.");

      // @ts-ignore
      const { id } = await Upvote.create({ userId, linkId });

      return `Link upvoted with id ${id}.`;
    } catch (error) {
      handleErrorThrows(error, "ForbiddenError", "Error");
    }
  },
  deleteLink: async (
    _: any,
    { linkId: id }: Record<"linkId", string>,
    { Link, accessToken }: GraphContextType
  ) => {
    try {
      const { sub: userId } = await authenticate(accessToken);

      const deletedRows = await Link.destroy({ where: { userId, id } });

      handleErrorInline(!deletedRows, ForbiddenError, forbidden403);

      return `Link with id ${id} deleted successfully.`;
    } catch (error) {
      handleErrorThrows(error, "ForbiddenError");
    }
  },
  updateLink: async (
    _: any,
    {
      headline,
      url,
      linkId: id,
    }: Record<"linkId" | "url" | "headline", string>,
    { Link, accessToken }: GraphContextType
  ) => {
    try {
      const { sub: userId } = await authenticate(accessToken);

      const [updatedRows] = await Link.update(
        { headline, url, id },
        { where: { userId, id } }
      );

      handleErrorInline(!updatedRows, ForbiddenError, forbidden403);

      return `Link with id ${id} updated successfully.`;
    } catch (error) {
      handleErrorThrows(error, "ForbiddenError");
    }
  },
};

export default Mutation;
