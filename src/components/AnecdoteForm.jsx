import { useMutation, useQueryClient } from 'react-query';
import anecdoteService from '../services/anecdoteService';
import { useNotifyDispatch } from './NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotifyDispatch();
  const newAnecdoteMutation = useMutation(anecdoteService.createNewAnecdote, {
    onSuccess: (newAnecdote) => {
      // Update anecdotes manually for reduce server load.
      const anecdotes = queryClient.getQueryData('anecdotes');
      queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote));

      const sucMessage = `New Anecdote: ${newAnecdote.content} created`;
      dispatch({ type: 'SUCCESS', payload: sucMessage });
      setTimeout(() => {
        dispatch({ type: 'RESET' });
      }, 5000);
    },
    onError: (error) => {
      const errMessage = `Error: ${error.response.data.error}`;

      dispatch({ type: 'ERROR', payload: errMessage });
      setTimeout(() => {
        dispatch({ type: 'RESET' });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    const newObject = {
      content: content,
      votes: 0,
    };
    newAnecdoteMutation.mutate(newObject);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input style={{ backgroundColor: 'lightskyblue' }} name="anecdote" />
        <button style={{ backgroundColor: 'goldenrod' }} type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
