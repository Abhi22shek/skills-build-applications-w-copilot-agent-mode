import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setError('');
        const data = await fetchCollection('/leaderboard/');
        setEntries(data);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Could not load leaderboard.');
      }
    };

    void loadLeaderboard();
  }, []);

  return (
    <section>
      <h2 className="h4">Leaderboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ol className="list-group list-group-numbered">
        {entries.map((entry) => (
          <li key={entry._id} className="list-group-item d-flex justify-content-between">
            <span>{entry.userId?.name ?? 'Unknown athlete'}</span>
            <strong>{entry.points} pts</strong>
          </li>
        ))}
        {entries.length === 0 && <li className="list-group-item text-muted">No ranking data yet.</li>}
      </ol>
    </section>
  );
}

export default Leaderboard;
