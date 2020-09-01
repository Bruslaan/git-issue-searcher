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
query ($number: Int! $cursor: String $repoOwner: String! $repoName: String!){
  repository(owner: $repoOwner, name: $repoName) {
    issue(number: $number) {
      id
      comments(first: 2 after: $cursor) {
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