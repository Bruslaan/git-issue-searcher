import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { SearchLocation, IssueState, Issue } from '../interfaces';

const SearchResults = gql`
query ($queryParameters: String!)
  {
    search(query: $queryParameters, type: ISSUE, first: 10,) {
      nodes {
        ... on Issue {
          title
          body
          id 
          state
        }
      }
    }
  }
`;

interface Props {
  term: String,
  searchLocation: SearchLocation,
  issueState: IssueState,
  repoName: String
}

export const QueryResults: React.FC<Props> = ({ term, searchLocation, issueState, repoName }) => {


  const state = issueState === IssueState.both ? "" : `state:${issueState}`
  const repo = `repo:${repoName}`

  const queryParameters = `${repo} in:${searchLocation} ${term} ${state} type:issue`


  const { loading, error, data } = useQuery(SearchResults, {
    variables: { queryParameters },
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;


  console.log(data.search.nodes)

  if (data.search.nodes.length === 0) return <p>No Data</p>
  return (<div>
    <ul>
      {data.search.nodes.map((item: Issue) => {
        return <li key={item.id}>
          <h1> {item.title}</h1>
          <p>{item.body}</p>
          <span>{item.state}</span>
        </li>
      })}
    </ul>
  </div>)


}

