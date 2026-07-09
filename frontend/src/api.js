const BASE = 'kamesh-git-main-kamesh-ds-projects.vercel.app';

async function handle(res) {
  const contentType = res.headers.get('content-type') || '';
  const body = contentType.includes('application/json') ? await res.json() : null;
  if (!res.ok) {
    throw new Error((body && body.error) || `Request failed (${res.status})`);
  }
  return body;
}

export function authHeaders() {
  const token = localStorage.getItem('portfolio_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(username, password) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return handle(res);
}

export async function verifyToken() {
  const res = await fetch(`${BASE}/api/auth/verify`, { headers: authHeaders() });
  return handle(res);
}

export async function getPortfolio() {
  const res = await fetch(`${BASE}/api/portfolio`);
  return handle(res);
}

export async function savePortfolio(data) {
  const res = await fetch(`${BASE}/api/portfolio`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data)
  });
  return handle(res);
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch(`${BASE}/api/upload`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData
  });
  return handle(res);
}
