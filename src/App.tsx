import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { QueryResults, IssueState, SearchLocation } from './QueryResults/QueryResults'
import SearchComponent from './SearchComponent'
import { client } from './graphQlClient'

function App() {
  const [searchTerm, setsearchTerm] = useState<String>("")

  const changeSearchTerm=(term:String)=>{
    setsearchTerm(term)
  }

  return (
    <div>
      <SearchComponent onChangeTerm={changeSearchTerm} />
      <ApolloProvider client={client}>
        <QueryResults term={searchTerm} issueState={IssueState.open} searchLocation={SearchLocation.title} />
      </ApolloProvider>
    </div>

  );
}

export default App;
