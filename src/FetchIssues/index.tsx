import React from 'react'
import { useQuery } from '@apollo/client';
import { SearchLocation, IssueState, Issue } from '../interfaces';
import { GET_ISSUE } from '../queries'
import FetchComments from '../FetchComments'

interface Props {
  term: String,
  searchLocation: SearchLocation,
  issueState: IssueState,
  repoName: String
}

export const QueryResults: React.FC<Props> = ({ term, searchLocation, issueState, repoName }) => {


  const state = issueState === IssueState.both ? "" : `state:${issueState}`
  const repo = `repo:${repoName}`
  const location = searchLocation === SearchLocation.both ? `in:${SearchLocation.title},${SearchLocation.body}` : `in:${searchLocation}`

  const queryParameters = `${repo} ${location} ${term} ${state} type:issue`


  const { loading, error, data } = useQuery(GET_ISSUE, {
    variables: { queryParameters },
  });


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;


  console.log(data.search.nodes)

  if (data.search.nodes.length === 0) return <p>No Data</p>
  return (<div>

    {data.search.nodes.map((item: Issue) => {
      return <div key={item.id}>
        <h1> {item.title}</h1>
        <p>{item.body}</p>
        <span>{item.state}</span>

        <FetchComments issueNumber={item.number} />
      </div>
    })}

  </div>)


}

