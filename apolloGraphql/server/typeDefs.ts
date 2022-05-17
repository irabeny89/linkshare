import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    "Login as an authenticated user and get an access token."
    login(email: String!, password: String!): String!
    "Get information about the current user."
    me: User!
    "Get links based on parameters."
    links(args: PagingInput!): LinkConnection!
  }

  type Mutation {
    "New user sign up to be an authenticated user and get an access token."
    signup(email: String!, password: String!, name: String!): String!
    "Authenticated users can post a link and get a response message."
    shareLink(url: String!, headline: String!): String!
    "Authenticated users can up-vote a link with ID and get a response message."
    upvote(linkId: ID!): String!
    "Authentic user can delete shared link."
    deleteLink(linkId: ID!): String!
    "Authentic user can edit shared link."
    updateLink(linkId: ID!, url: String!, headline: String!): String!
  }

  input PagingInput {
    "Specify the number of items to return from the start of the list."
    first: Int
    "Specify the position to start fetching from the list by starting from the next item after the specified position."
    after: String
    "Specify the number of items to return from the end of the list."
    last: Int
    "Specify the position to start fetching from the list when fetching backwards."
    before: String
    "Specify the how to sort the list- ascending or descending order."
    order: orderDirection
  }

  enum orderDirection {
    "Ascending order specification."
    ASCEND
    "Descending order specification."
    DESCEND
  }

  type Link {
    "This object identification string."
    id: ID!
    "The headline of the link's information."
    headline: String!
    "The link to an information."
    url: String!
    "The id of the user who shared the link."
    userId: String!
    "The user sharing the link."
    user: User!
    "The list of people's ID up-voting(liking) the link information."
    upvotersId: [ID!]!
    "The total number of upvotes for this link."
    totalUpvotes: Int!
    "The timestamp of when the link was created."
    createdAt: String!
    "The timestamp of when the link was updated."
    updatedAt: String!
  }

  type User {
    "This object identification string."
    id: ID!
    "The user name."
    name: String!
    "The user email address."
    email: String!
    "The number of all links shared by the user."
    totalLinks: Int!
    "The link connection"
    links(args: PagingInput!): LinkConnection!
    "The total number of user upvoted links."
    totalUpvotes: Int!
    "The user upvoted links."
    upvotedLinks(args: PagingInput!): LinkConnection!
    "The time when the user signed up."
    createdAt: String!
    "The time whenthe user updated."
    updatedAt: String!
  }

  type LinkEdge {
    "The cursor/position of the object in the list of all links. It can be used to identify an item from a list."
    cursor: String!
    "The actual object."
    node: Link!
  }

  type PageInfo {
    "The first identity of an item from a returned list. It can be used to specify where to fetch list from."
    startCursor: String!
    "The last identity of an item from a returned list. It can be used to specify where to fetch list from."
    endCursor: String!
    "It indicates whether there are more items when fetching forward."
    hasNextPage: Boolean!
    "It indicates whether there are more items when fetching backward."
    hasPreviousPage: Boolean!
  }

  type LinkConnection {
    "The list of item requested along with an identifying cursor."
    edges: [LinkEdge!]!
    "The list information that can be used to manage pagination."
    pageInfo: PageInfo!
  }
`;

export default typeDefs;
