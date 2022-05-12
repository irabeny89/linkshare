import { gql } from "@apollo/client";

const LINKFIELDS = gql`
  fragment LinkFields on Link {
    id
    headline
    url
    user {
      id
      name
    }
    upvotersId
    totalUpvotes
    createdAt
  }
`;

export const LINKS = gql`
  ${LINKFIELDS}
  query Links($args: PagingInput!) {
    links(args: $args) {
      edges {
        node {
          ...LinkFields
        }
      }
      pageInfo {
        startCursor
        hasNextPage
      }
    }
  }
`;

export const SHARE_LINK = gql`
  mutation ShareLink($url: String!, $headline: String!) {
    shareLink(url: $url, headline: $headline)
  }
`;

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;
