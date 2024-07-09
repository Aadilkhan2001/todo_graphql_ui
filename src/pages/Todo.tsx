import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { ProtectedRoute, TodoForm } from '../components';
import { LIST_ALL_TODO, DELETE_TODO } from '../queries';

export interface TodoItem {
  Id: string;
  title: string;
  description: string;
  time: string;
}

// eslint-disable-next-line react-refresh/only-export-components
const Todo: React.FC = () => {
  const { data, error, loading } = useQuery(LIST_ALL_TODO);
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [deleteTodo] = useMutation(DELETE_TODO);

  const navigate = useNavigate();

  const onCancelHandler = () => setEditId(undefined);

  const onDeleteTodo = (id: string) => {
    deleteTodo({
      variables: { id: id },
      refetchQueries: [{ query: LIST_ALL_TODO }],
    });
  };

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    if (error.networkError?.statusCode === 401) {
      localStorage.removeItem('token');
      navigate('/login');
    }
    return <p>Failed to load data</p>;
  }
  return (
    <div className="todo-container">
      <h1>My Todo</h1>
      <TodoForm />
      {data.todos.map((todo: TodoItem) => (
        <div className="todo-item" key={`${todo.Id}`}>
          {editId !== undefined && editId === todo.Id ? (
            <TodoForm id={editId} input={todo} onCancel={onCancelHandler} />
          ) : (
            <>
              <h3>
                {todo.title} At {todo.time}
              </h3>
              <p>{todo.description}</p>
              <p>Time: {todo.time}</p>
              <button
                onClick={() => {
                  setEditId(todo.Id);
                }}
              >
                Edit
              </button>
              <button onClick={() => onDeleteTodo(todo.Id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

const protectedToDo = () => {
  return (
    <ProtectedRoute>
      <Todo />
    </ProtectedRoute>
  );
};
export default protectedToDo;
