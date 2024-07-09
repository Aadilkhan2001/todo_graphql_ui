import React from 'react';
import { useQuery } from '@apollo/client';

import { GET_LOGIN_URL } from '../queries';

const Login: React.FC = () => {
  const { data, error, loading } = useQuery(GET_LOGIN_URL, {
    variables: { redirectUri: `${window.location.origin}/auth` },
  });

  if (loading) {
    return <p>Redirecting...</p>;
  }

  if (error || !data || !data.loginUrl) {
    return <p>Failed to login. Please try again later.</p>;
  }

  window.location.href = data.loginUrl;

  return null;
};

export default Login;
