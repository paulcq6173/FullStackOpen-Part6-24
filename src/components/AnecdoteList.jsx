import { useMutation, useQueryClient } from 'react-query';
import anecdoteService from '../services/anecdoteService';
import { useNotifyDispatch } from './NotificationContext';

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient();
  const dispatch = useNotifyDispatch();
  const newMutation = useMutation(anecdoteService.updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      // Update anecdotes manually for reduce server load.
      const anecdotes = queryClient.getQueryData('anecdotes');
      const newAnecdotes = anecdotes.map((e) =>
        e.id === updatedAnecdote.id ? updatedAnecdote : e
      );
      queryClient.setQueryData('anecdotes', newAnecdotes);

      dispatch({
        type: 'SUCCESS',
        payload: `You voted anecdote: '${updatedAnecdote.content}'`,
      });
      setTimeout(() => {
        dispatch({ type: 'RESET' });
      }, 5000);
    },
    onError: (error, updatedAnecdote, context) => {
      const errMessage = `Failed to update anecdote: ${updatedAnecdote.content}`;
      dispatch({ type: 'ERROR', payload: errMessage });
      setTimeout(() => {
        dispatch({ type: 'RESET' });
      }, 5000);
    },
  });

  const handleVote = (anecdote) => {
    console.log('vote');
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    newMutation.mutate(updatedAnecdote);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
