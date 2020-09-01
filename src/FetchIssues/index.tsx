import React from 'react'
import { useQuery } from '@apollo/client';
import { SearchLocation, IssueState, Issue } from '../interfaces';
import { GET_ISSUE } from '../queries'
import FetchComments from '../FetchComments'
import IssueCard from './IssueCard'


interface Props {
  term: String,
  searchLocation: SearchLocation,
  issueState: IssueState,
  repoName: String
}

export const QueryResults: React.FC<Props> = ({ term, searchLocation, issueState, repoName }) => {


  // query params
  const state = issueState === IssueState.both ? "" : `state:${issueState}`
  const repo = `repo:${repoName}`
  const location = searchLocation === SearchLocation.both ? `in:${SearchLocation.title},${SearchLocation.body}` : `in:${searchLocation}`

  // concat query params
  const queryParameters = `${repo} ${location} ${term} ${state} type:issue`


  const { loading, error, data } = useQuery(GET_ISSUE, {
    variables: { queryParameters },
  });

  // Comments search needs an repoowner and reponame as an own arg
  const [splittedRepoOwner, splittedRepoName] = repoName.split("/")

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;


  if (data.search.nodes.length === 0) return <p>No Data</p>
  return (<div>

    {data.search.nodes.map((item: Issue) => {
      return <IssueCard key={item.id} issue={item}>
        <FetchComments repoName={splittedRepoName} repoOwner={splittedRepoOwner} issueNumber={item.number} />
      </IssueCard>


    })}

  </div>)


}

