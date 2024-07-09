import React from 'react';
import { useQuery } from '@apollo/client';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { GET_TOKEN } from '../queries';

const Auth: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data, error, loading } = useQuery(GET_TOKEN, {
    variables: {
      code: searchParams.get('code'),
      redirectUri: `${window.location.origin}/auth`,
    },
  });

  if (loading) {
    return <p>Logging in...</p>;
  }

  if (error) {
    console.log(error);
    return <p>Failed to login. Please try again later.</p>;
  }

  if (data?.token) {
    navigate('/');
    localStorage.setItem('token', data?.token);
  }

  return null;
};

export default Auth;
