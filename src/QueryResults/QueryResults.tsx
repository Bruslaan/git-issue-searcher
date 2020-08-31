import React from 'react'
import { useQuery, gql } from '@apollo/client';

const SearchResults = gql`
query ($queryParameters: String!)
  {
    search(query: $queryParameters, type: ISSUE, first: 10,) {
      nodes {
        ... on Issue {
          title
          body
          id
        }
      }
    }
  }
`;

export interface Issue{
  title: string
  body: String
  id: number
}

export enum SearchLocation {
  title,
  body,
  both
}
export enum IssueState {
  open,
  closed
}

interface Props {
  term: String,
  searchLocation: SearchLocation,
  issueState: IssueState,
}

export const QueryResults: React.FC<Props> = ({ term, searchLocation, issueState }) => {


  const queryParameters = `repo:facebook/react in:${SearchLocation[searchLocation]} ${term} state:${IssueState[issueState]} type:issue`
 
  const { loading, error, data } = useQuery(SearchResults, {
    variables: { queryParameters },
  });



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;


  console.log(data.search.nodes)
  return (<div>
    <ul>
      {data.search.nodes.map((item: Issue) => {
        return <li key={item.id}>{item.title}{item.id}</li>
      })}
    </ul>
  </div>)


}

