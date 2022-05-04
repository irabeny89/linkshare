import { LinkVertexType, UserVertexType } from "types";

const mocks: boolean | any = {
  Link: (): LinkVertexType => ({
    headline: "ApolloGraphQL to the moon.",
    created_at: new Date()+"",
  }),
  User: (): UserVertexType => ({
    name:  "Ernest"
  })
};

export default mocks;
