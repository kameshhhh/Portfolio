export default function About({ profile, certifications }) {
  return (
    <section id="about" className="section">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56 }}>
        <div>
          <div className="eyebrow">About</div>
          <h2 className="section-title">Working method, not just a stack.</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.75, marginBottom: 20 }}>
            {profile.summary}
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.75 }}>
            Every build below follows the same order: name the real friction, map the full user
            journey and state transitions before touching UI, then ship something that works —
            refined against what testers actually stumble on, not assumptions.
          </p>
        </div>

        <div className="card" style={{ padding: 28 }}>
          <div className="eyebrow" style={{ marginBottom: 20 }}>Certifications</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {(certifications || []).map((c) => (
              <div key={c.id} style={{ borderLeft: '2px solid var(--signal)', paddingLeft: 16 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{c.name}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>{c.issuer}</div>
                <div className="mono" style={{ color: 'var(--text-dim)', fontSize: 11, marginTop: 6 }}>
                  {c.grade} · {c.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #about .container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
