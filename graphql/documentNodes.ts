import { gql } from "apollo-server-micro";

const LINKFIELDS = gql`
  fragment LinkFields on Link {
    id
    headline
    url
    poster {
      id
      name
    }
    upvoters
    created_at
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
    }
  }
`;
