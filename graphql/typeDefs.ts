import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    login(email: String, password: String!): String!
    info: String!
    links(args: PagingInput!): [Link!]!
  }

  type Mutation {
    signup(email: String!, password: String!, name: String!): String!
    postLink(url: String!, description: String!): String!
    upvote(linkId: ID!): String!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
    poster: User!
    votes: [ID!]!
    voteCount: Int!
    created_at: String!
    updated_at: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    sharedLinks: [Link!]!
    upvotedLinks: [Link!]!
  }
`;
