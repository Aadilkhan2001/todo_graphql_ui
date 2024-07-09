import { gql } from '@apollo/client';

export const LIST_ALL_TODO = gql`
  {
    todos {
      Id
      title
      description
      time
    }
  }
`;

export const GET_LOGIN_URL = gql`
  query GetLoginUrl($redirectUri: String!) {
    loginUrl(redirectUri: $redirectUri)
  }
`;

export const GET_TOKEN = gql`
  query GetToken($code: String!, $redirectUri: String!) {
    token(code: $code, redirectUri: $redirectUri)
  }
`;

export const CREATE_TODO = gql`
  mutation createTodo($title: String!, $time: String!, $description: String!) {
    createTodo(title: $title, description: $description, time: $time) {
      response
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation updateTodo(
    $id: String!
    $title: String!
    $description: String!
    $time: String!
  ) {
    updateTodo(id: $id, title: $title, description: $description, time: $time) {
      response
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($id: String!) {
    deleteTodo(id: $id) {
      response
    }
  }
`;
