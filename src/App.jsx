import { useQuery } from 'react-query';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import anecdoteService from './services/anecdoteService';

const App = () => {
  const result = useQuery('anecdotes', () => anecdoteService.getAll(), {
    // Disable auto-refetch when focus on input bar
    refetchOnWindowFocus: false,
    retry: 1,
  });

  console.log(result);

  // First rendering. status: loading
  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  // Error occurs when try to fetch data
  if (result.isError) {
    return <p>anecdote service not available due to problems in server</p>;
  }

  // Second rendering. status: success
  const rawAnecdotes = result.data;
  const orderedArray = rawAnecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      <AnecdoteList anecdotes={orderedArray} />
    </div>
  );
};

export default App;
