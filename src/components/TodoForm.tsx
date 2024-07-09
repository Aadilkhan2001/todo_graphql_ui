import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { CREATE_TODO, UPDATE_TODO, LIST_ALL_TODO } from '../queries';

import { type TodoItem } from '../pages';

interface Props {
  id?: string;
  input?: TodoItem;
  onCancel?: () => void;
}

const TodoForm: React.FC<Props> = ({ id, input, onCancel }) => {
  const defaultUserInput = {
    title: input?.title,
    description: input?.description,
    time: input?.time,
  };
  const onCancelHandler = onCancel ?? null;

  const [userInput, setUserInput] = useState(defaultUserInput);
  const [createTodo] = useMutation(CREATE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);

  const handleSubmit = (e: React.FormEvent) => {
    if (id) {
      e.preventDefault();
      updateTodo({
        variables: {
          id: id,
          title: userInput.title,
          description: userInput.description,
          time: userInput.time,
        },
        refetchQueries: [{ query: LIST_ALL_TODO }],
      });
    } else {
      e.preventDefault();
      createTodo({
        variables: {
          title: userInput.title,
          description: userInput.description,
          time: userInput.time,
        },
        refetchQueries: [{ query: LIST_ALL_TODO }],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={userInput.title}
        onChange={e => setUserInput({ ...userInput, title: e.target.value })}
        placeholder={id ? 'Update title' : 'Add title'}
      />
      <input
        type="text"
        value={userInput.description}
        onChange={e =>
          setUserInput({ ...userInput, description: e.target.value })
        }
        placeholder={id ? 'Update description' : 'Add description'}
      />
      <input
        type="time"
        value={userInput.time}
        onChange={e => setUserInput({ ...userInput, time: e.target.value })}
        placeholder={id ? 'Update time' : 'Add time'}
      />
      <button type="submit">{id ? 'Update' : 'Add'}</button>
      {id && (
        <button
          type="button"
          className="cancel"
          onClick={() => (onCancelHandler ? onCancelHandler() : null)}
        >
          {'cancel'}
        </button>
      )}
    </form>
  );
};

export default TodoForm;
