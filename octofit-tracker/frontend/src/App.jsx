import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { apiBaseUrl } from './utils/api';
import './App.css';

function App() {
  const hasCodespaceName = Boolean(import.meta.env.VITE_CODESPACE_NAME);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container py-4">
          <h1 className="display-6 mb-2">OctoFit Tracker</h1>
          <p className="text-secondary mb-0">React 19 presentation tier with Codespaces-aware API routing</p>
          <small className="text-muted">API base: {apiBaseUrl}</small>
          {!hasCodespaceName && (
            <p className="small text-warning-emphasis mb-0 mt-2">
              VITE_CODESPACE_NAME is not set. Using localhost fallback.
            </p>
          )}
        </div>
      </header>

      <main className="container py-4">
        <nav className="nav nav-pills gap-2 mb-4">
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/users">Users</NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/teams">Teams</NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/activities">Activities</NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/leaderboard">Leaderboard</NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/workouts">Workouts</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
