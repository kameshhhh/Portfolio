import { useEffect, useState } from 'react';

export default function Projects({ projects }) {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox]);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="eyebrow">Projects</div>
        <h2 className="section-title">Shipped builds</h2>
        <p className="section-sub">Each one is written up the same way it was built — the problem first, the flow mapped before code, then what shipped.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {(projects || []).map((p) => (
            <article key={p.id} className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: p.images && p.images.length ? '1fr 1fr' : '1fr', gap: 0 }}>
                <div style={{ padding: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 21, fontWeight: 600 }}>{p.title}</h3>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>{p.year}</span>
                  </div>
                  <div className="mono" style={{ fontSize: 12, color: 'var(--signal)', marginBottom: 20 }}>{p.meta}</div>

                  <ProjectField label="Problem" value={p.problem} />
                  <ProjectField label="Flow" value={p.flow} />
                  <ProjectField label="Shipped" value={p.outcome} />
                </div>

                {p.images && p.images.length > 0 && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: p.images.length > 1 ? '1fr 1fr' : '1fr',
                      gap: 2,
                      background: 'var(--bg)',
                      alignContent: 'start'
                    }}
                  >
                    {p.images.slice(0, 4).map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setLightbox(src)}
                        style={{
                          border: 'none',
                          padding: 0,
                          background: 'none',
                          cursor: 'zoom-in',
                          display: 'block',
                          width: '100%',
                          height: '100%'
                        }}
                        aria-label={`Open screenshot ${i + 1} of ${p.title}`}
                      >
                        <img
                          src={src}
                          alt={`${p.title} screenshot ${i + 1}`}
                          loading="lazy"
                          style={{ width: '100%', height: '100%', minHeight: 140, objectFit: 'cover', display: 'block', transition: 'transform 200ms ease' }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(6,8,11,0.92)', zIndex: 100,
            display: 'grid', placeItems: 'center', padding: 40, cursor: 'zoom-out'
          }}
        >
          <img src={lightbox} alt="Project screenshot enlarged" style={{ maxWidth: '92vw', maxHeight: '88vh', borderRadius: 8, border: '1px solid var(--border-strong)' }} />
        </div>
      )}

      <style>{`
        @media (max-width: 760px) {
          #projects article > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ProjectField({ label, value }) {
  if (!value) return null;
  return (
    <div style={{ marginBottom: 14 }}>
      <div className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: 4 }}>
        {label}
      </div>
      <p style={{ fontSize: 14.5, lineHeight: 1.65, color: 'var(--text-primary)' }}>{value}</p>
    </div>
  );
}
