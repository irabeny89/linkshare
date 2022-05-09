import {
  ForbiddenError,
  ApolloError,
} from "apollo-server-micro";
import { JwtPayload } from "jsonwebtoken";
import { GraphContextType } from "types";
import { devlog, getAuthPayload, handleErrorInline } from "utils/";
import config from "config";

const {
  siteData: {
    error: { server: { general } },
  },
} = config;

const Query = {
  me: async (_: any, __: any, { User, accessToken }: GraphContextType) => {
    try {
      const payload = await getAuthPayload(accessToken);

      // throw error if no payload i.e unauthentic
      handleErrorInline(!payload, ForbiddenError, "Not allowed.");
      handleErrorInline(
        typeof payload === "string",
        Error,
        "Invalid authentication payload - Payload should be object type."
      );

      const { sub } = payload as JwtPayload,
        user = await User.findByPk(sub);

      return user;
    } catch (error: any) {
      devlog(error);
      if (error.name === "ForbiddenError") throw error;
      handleErrorInline(!!error, ApolloError, general);
    }
  },
};

export default Query;
