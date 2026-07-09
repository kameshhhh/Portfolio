export default function Skills({ skills }) {
  const groups = Object.entries(skills || {});

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="eyebrow">Skills</div>
        <h2 className="section-title">Toolset</h2>
        <p className="section-sub">Grouped by how it's actually used — product thinking, AI-assisted workflow, design, and the dev stack that ships it.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 20 }}>
          {groups.map(([group, items]) => (
            <div key={group} className="card" style={{ padding: 24 }}>
              <div className="mono" style={{ fontSize: 12, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 }}>
                {group}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {items.map((item) => (
                  <span
                    key={item}
                    className="mono"
                    style={{
                      fontSize: 12,
                      padding: '6px 10px',
                      border: '1px solid var(--border-strong)',
                      borderRadius: 5,
                      color: 'var(--text-primary)'
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
