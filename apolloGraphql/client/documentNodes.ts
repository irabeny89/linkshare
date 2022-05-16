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

export const SIGN_UP = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(email: $email, password: $password, name: $name)
  }
`;

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const SHARE_LINK = gql`
  mutation ShareLink($url: String!, $headline: String!) {
    shareLink(url: $url, headline: $headline)
  }
`;

export const ME = gql`
  ${LINKFIELDS}
  query Me($linksArgs: PagingInput!, $upvotedLinksArgs: PagingInput!) {
    me {
      id
      name
      email
      totalLinks
      totalUpvotes
      links(args: $linksArgs) {
        edges {
          node {
            id
            headline
            url
            userId
            upvotersId
            totalUpvotes
            createdAt
          }
        }
        pageInfo {
          startCursor
          hasNextPage
        }
      }
      upvotedLinks(args: $upvotedLinksArgs) {
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
      createdAt
    }
  }
`;

export const PROFILE = gql`
  query Profile {
    me {
      id
      name
      email
      totalLinks
      totalUpvotes
      createdAt
    }
  }
`;

export const MY_LINKS = gql`
  query MyLinks($linksArgs: PagingInput!) {
    me {
      id
      name
      email
      links(args: $linksArgs) {
        edges {
          node {
            id
            headline
            url
            totalUpvotes
            createdAt
          }
        }
        pageInfo {
          startCursor
          hasNextPage
        }
      }
    }
  }
`;
