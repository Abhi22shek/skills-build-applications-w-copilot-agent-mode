import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setError('');
        const data = await fetchCollection('/teams/');
        setTeams(data);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Could not load teams.');
      }
    };

    void loadTeams();
  }, []);

  return (
    <section>
      <h2 className="h4">Teams</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row g-3">
        {teams.map((team) => (
          <div key={team._id} className="col-12 col-lg-6">
            <article className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="h5 card-title">{team.name}</h3>
                <p className="mb-2 text-muted">
                  Created by: {team.createdBy?.name ?? 'Unknown'}
                </p>
                <p className="mb-1 fw-semibold">Members</p>
                <ul className="mb-0">
                  {(team.memberIds ?? []).map((member) => (
                    <li key={member._id}>{member.name}</li>
                  ))}
                  {(team.memberIds ?? []).length === 0 && <li>No members yet.</li>}
                </ul>
              </div>
            </article>
          </div>
        ))}
        {teams.length === 0 && <p className="text-muted">No teams found.</p>}
      </div>
    </section>
  );
}

export default Teams;
