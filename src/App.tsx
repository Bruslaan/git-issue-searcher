import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { QueryResults } from './FetchIssues'
import SearchComponent from './SearchComponent'
import SelectComponent from './SelectComponent'
import { client } from './graphQlClient'
import { IssueState, SearchLocation } from './interfaces';

function App() {
  const [repoName, setrepoName] = useState<String>("facebook/react")
  const [searchTerm, setsearchTerm] = useState<String>("")
  const [issueState, setissueState] = useState<IssueState>(IssueState.open)
  const [searchLocation, setsearchLocation] = useState<SearchLocation>(SearchLocation.title)
  const changeSearchTerm = (term: String) => {
    setsearchTerm(term)
  }

  const changeRepoName = (event: any) => {
    setrepoName(event.target.value as String)
  }

  const changeIssueState = (state: IssueState) => {
    setissueState(state)
  }

  const changeLocation = (selected: SearchLocation) => {
    setsearchLocation(selected)
  }

  return (
    <div className="container">

      <div className="searchBar">
        <input type="text" placeholder="facebook/react" onChange={changeRepoName} />
        <SearchComponent onChangeTerm={changeSearchTerm} />
        <SelectComponent onSelectChange={changeIssueState} items={[IssueState.both, IssueState.open, IssueState.closed]} />
        <SelectComponent onSelectChange={changeLocation} items={[SearchLocation.both, SearchLocation.title, SearchLocation.body]} />
      </div>


      <ApolloProvider client={client}>
        <QueryResults repoName={repoName} term={searchTerm} issueState={issueState} searchLocation={searchLocation} />
      </ApolloProvider>
    </div>

  );
}

export default App;
