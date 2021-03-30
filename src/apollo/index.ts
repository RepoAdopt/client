import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from "apollo-link-context";

const url = process.env.VUE_APP_GRAPHQL;

const link = createHttpLink({
  uri: url + '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('repoAdoptToken');
  // return the headers to the context so httpLink can read them
  if(token) {
    return {
      headers: {
        ...headers,
        Authorization: "Bearer " + token,
      }
    }
  }
});

const cache = new InMemoryCache();

const apollo = new ApolloClient({
  link: authLink.concat(link),
  cache,
});

export default apollo;
