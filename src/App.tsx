import { ApolloProvider } from '@apollo/client';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import { useFetch } from './client/index';
import { Login, Auth, Todo } from './pages';

const App = () => {
  const { client: todoClient } = useFetch('/todo', true);
  const { client: authClient } = useFetch('/auth');

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <ApolloProvider client={authClient}>
              <Login />
            </ApolloProvider>
          }
        />
        <Route
          path="/auth"
          element={
            <ApolloProvider client={authClient}>
              <Auth />
            </ApolloProvider>
          }
        />
        <Route
          path="/"
          element={
            <ApolloProvider client={todoClient}>
              <Todo />
            </ApolloProvider>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
