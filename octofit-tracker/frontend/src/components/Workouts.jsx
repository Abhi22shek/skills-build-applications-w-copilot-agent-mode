import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setError('');
        const data = await fetchCollection('/workouts/');
        setWorkouts(data);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Could not load workouts.');
      }
    };

    void loadWorkouts();
  }, []);

  return (
    <section>
      <h2 className="h4">Workouts</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div key={workout._id} className="col-12 col-md-6 col-lg-4">
            <article className="card h-100 shadow-sm">
              <div className="card-body">
                <h3 className="h5 card-title">{workout.title}</h3>
                <p className="mb-1">Intensity: <span className="text-capitalize">{workout.intensity}</span></p>
                <p className="mb-1">Duration: {workout.durationMinutes} min</p>
                <p className="mb-0">Target: <span className="text-capitalize">{workout.targetFitnessLevel}</span></p>
              </div>
            </article>
          </div>
        ))}
        {workouts.length === 0 && <p className="text-muted">No workouts found.</p>}
      </div>
    </section>
  );
}

export default Workouts;
