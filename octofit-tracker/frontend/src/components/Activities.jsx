import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setError('');
        const data = await fetchCollection('/activities/');
        setActivities(data);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Could not load activities.');
      }
    };

    void loadActivities();
  }, []);

  return (
    <section>
      <h2 className="h4">Activities</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>{activity.userId?.name ?? 'Unknown'}</td>
                <td className="text-capitalize">{activity.type}</td>
                <td>{activity.durationMinutes}</td>
                <td>{activity.caloriesBurned}</td>
              </tr>
            ))}
            {activities.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center text-muted">
                  No activities found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Activities;
