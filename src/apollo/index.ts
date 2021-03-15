import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const url = process.env.VUE_APP_GRAPHQL;// 'http://localhost:5000';
console.log(process.env)
console.log(url)

const link = createHttpLink({
  uri: url + '/graphql',
});

const cache = new InMemoryCache();

const apollo = new ApolloClient({
  link,
  cache,
});

export default apollo;
