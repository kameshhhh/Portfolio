import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function RequireAuth({ children }) {
  const { isAuthed, checking } = useAuth();

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        checking session…
      </div>
    );
  }

  if (!isAuthed) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
