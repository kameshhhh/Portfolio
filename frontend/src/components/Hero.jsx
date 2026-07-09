import BlueprintHero from './BlueprintHero.jsx';

export default function Hero({ profile }) {
  return (
    <section id="top" style={{ padding: '72px 0 40px' }}>
      <div className="container">
        <div className="eyebrow">{profile.education_line}</div>
        <h1
          style={{
            fontSize: 'clamp(38px, 6vw, 68px)',
            fontWeight: 700,
            lineHeight: 1.05,
            maxWidth: 820,
            marginBottom: 24
          }}
        >
          {profile.tagline}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 17, lineHeight: 1.7, maxWidth: 640, marginBottom: 36 }}>
          {profile.summary}
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 64 }}>
          <a href="#projects" className="btn btn-primary">View projects →</a>
          <a href={`mailto:${profile.email}`} className="btn">{profile.email}</a>
          {profile.github && (
            <a href={`https://${profile.github}`} target="_blank" rel="noreferrer" className="btn mono">
              {profile.github}
            </a>
          )}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <BlueprintHero />
        </div>
      </div>
    </section>
  );
}
