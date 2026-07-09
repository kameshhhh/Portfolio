import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { login } from '../api';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signIn, isAuthed, checking } = useAuth();
  const navigate = useNavigate();

  if (!checking && isAuthed) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await login(username, password);
      signIn(res.token, res.username);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24 }}>
      <form onSubmit={handleSubmit} className="card" style={{ width: 360, padding: 32 }}>
        <div className="eyebrow">Admin</div>
        <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Sign in</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 13.5, marginBottom: 24 }}>
          Sign in to edit portfolio content and project screenshots.
        </p>

        <div className="field">
          <label htmlFor="username">Username</label>
          <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
        </div>

        {error && (
          <p role="alert" style={{ color: 'var(--danger)', fontSize: 13, marginBottom: 16 }}>{error}</p>
        )}

        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>

        <a href="/" className="mono" style={{ display: 'block', textAlign: 'center', marginTop: 20, fontSize: 12, color: 'var(--text-dim)' }}>
          ← back to site
        </a>
      </form>
    </div>
  );
}
