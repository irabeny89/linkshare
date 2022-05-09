import { UserInputError, ApolloError } from "apollo-server-micro";
import { GraphContextType, SignupInputType } from "types";
import { devlog, handleErrorInline } from "utils/";

const Mutation = {
  signup: async (_: any, args: SignupInputType, { User }: GraphContextType) => {
    try {
      const user = await User.create(args);

      return await user.getAccessToken();
    } catch (error: any) {
      devlog(error);
      handleErrorInline(
        error.name === "TypeError",
        ApolloError,
        "Oops :(. Server error."
      );
      // throw for other errors
      handleErrorInline(
        !!error,
        UserInputError,
        "Check your inputs, they are invalid."
      );
    }
  },
};

export default Mutation;
