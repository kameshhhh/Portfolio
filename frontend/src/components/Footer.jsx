export default function Footer({ profile }) {
  return (
    <footer style={{ padding: '32px 0', borderTop: '1px solid var(--border)' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span className="mono" style={{ fontSize: 12, color: 'var(--text-dim)' }}>
          © {new Date().getFullYear()} {profile.name}. Built with React &amp; Node.
        </span>
        <a href="/admin" className="mono" style={{ fontSize: 11, color: 'var(--text-dim)' }}>
          admin
        </a>
      </div>
    </footer>
  );
}
