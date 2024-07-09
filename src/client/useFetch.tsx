import { useMemo } from 'react';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import fetchClient from './fetchClient';

const useFetch = (path: string, authEnabled?: boolean) => {
  const client: ApolloClient<NormalizedCacheObject> = useMemo(
    () => fetchClient(path, authEnabled),
    [path, authEnabled]
  );
  return { client, path };
};

export default useFetch;
