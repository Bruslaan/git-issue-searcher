import gql from 'graphql-tag';


export const GET_ISSUE = gql`
query ($queryParameters: String!)
  {
    search(query: $queryParameters, type: ISSUE, first: 10,) {
      nodes {
        ... on Issue {
          title
          body
          id 
          state
          number
        }
      }
      pageInfo {
      endCursor
      hasNextPage
    }
    }
  }
`;



export const GET_COMMENTS_OF_ISSUE = gql`
query ($number: Int!){
  repository(owner: "facebook", name: "react") {
    issue(number: $number) {
      id
      comments(first: 1) {
        edges {
          node {
            id
            body
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
}

`;