import { gql } from "@apollo/client";

// fragments
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

// queries
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

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
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
      totalLinks
      links(args: $linksArgs) {
        edges {
          node {
            id
            headline
            url
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
    }
  }
`;

export const MY_UPVOTES = gql`
  ${LINKFIELDS}
  query MyUpvotes($upvotedLinksArgs: PagingInput!) {
    me {
      id
      totalUpvotes
      upvotedLinks(args: $upvotedLinksArgs) {
        edges {
          node {
            ...LinkFields
          }
        }
        pageInfo {
          startCursor
          endCursor
        }
      }
    }
  }
`;

// mutations
export const SIGN_UP = gql`
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(email: $email, password: $password, name: $name)
  }
`;

export const SHARE_LINK = gql`
  mutation ShareLink($url: String!, $headline: String!) {
    shareLink(url: $url, headline: $headline)
  }
`;

export const UPVOTE = gql`
  mutation Upvote($linkId: ID!) {
    upvote(linkId: $linkId)
  }
`;

export const UPDATE_LINK = gql`
  mutation UpdateLink($linkId: ID!, $url: String!, $headline: String!) {
    updateLink(linkId: $linkId, url: $url, headline: $headline)
  }
`;
