import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// import { relayStylePagination } from "@apollo/client/utilities";


const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          repository: {
            merge(existing, incoming) {
              return { ...existing, ...incoming };
            },
          },
        },
      },
    },
  }),
});
