import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';

import tokenProvider from '../token-provider';

const baseUrl = import.meta.env.VITE_API_URL;

const fetchClient = (endpoint: string, authEnabled?: boolean) => {
  const httpLink = new HttpLink({
    uri: `${baseUrl}${endpoint}`,
  });
  const link = authEnabled
    ? ApolloLink.from([tokenProvider, httpLink])
    : httpLink;
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};

export default fetchClient;
