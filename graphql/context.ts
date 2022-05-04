import { ContextFunction, AuthenticationError } from "apollo-server-core";
import { GraphContextType } from "types";

const context: object | ContextFunction<any, object> | undefined = async ({
  req,
  res,
}: Pick<GraphContextType, "req" | "res">): Promise<GraphContextType> => {
  try {
    // authenticate user
    // TODO: start database connection & add models to context
    return { req, res };
  } catch (error) {
    throw new AuthenticationError(
      "Not authenticated, Login or signup to continue."
    );
  }
};

export default context