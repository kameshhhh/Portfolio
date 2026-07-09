import { createContext, useContext, useEffect, useState } from 'react';
import { verifyToken } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('portfolio_admin_token'));
  const [username, setUsername] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      if (!token) { setChecking(false); return; }
      try {
        const res = await verifyToken();
        if (!cancelled) setUsername(res.username);
      } catch {
        if (!cancelled) {
          localStorage.removeItem('portfolio_admin_token');
          setToken(null);
        }
      } finally {
        if (!cancelled) setChecking(false);
      }
    }
    check();
    return () => { cancelled = true; };
  }, [token]);

  function signIn(newToken, user) {
    localStorage.setItem('portfolio_admin_token', newToken);
    setToken(newToken);
    setUsername(user);
  }

  function signOut() {
    localStorage.removeItem('portfolio_admin_token');
    setToken(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ token, username, checking, signIn, signOut, isAuthed: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
