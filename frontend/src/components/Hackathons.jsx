export default function Hackathons({ hackathons, education }) {
  return (
    <section id="track-record" className="section">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56 }}>
        <div>
          <div className="eyebrow">Track record</div>
          <h2 className="section-title" style={{ fontSize: 26, marginBottom: 28 }}>Hackathons</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {(hackathons || []).map((h) => (
              <div key={h.id} style={{ display: 'flex', gap: 14 }}>
                <div style={{ width: 8, height: 8, marginTop: 6, background: 'var(--accent)', flexShrink: 0, transform: 'rotate(45deg)' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{h.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13.5, marginTop: 3 }}>{h.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="eyebrow" style={{ opacity: 0 }}>_</div>
          <h2 className="section-title" style={{ fontSize: 26, marginBottom: 28 }}>Education</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {(education || []).map((e) => (
              <div key={e.id} className="card" style={{ padding: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ fontWeight: 600, fontSize: 14.5 }}>{e.school}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>{e.years}</div>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 6 }}>{e.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          #track-record .container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
