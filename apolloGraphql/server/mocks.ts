import { LinkNodeType, UserNodeType } from "types";

const mocks: boolean | any = {
  Link: (): Partial<LinkNodeType> => ({
    headline: "ApolloGraphQL to the moon.",
    createdAt: new Date()+"",
  }),
  User: (): Partial<UserNodeType> => ({
    name:  "Ernest"
  })
};

export default mocks;
