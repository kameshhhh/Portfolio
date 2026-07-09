export default function Contact({ profile }) {
  return (
    <section id="contact" className="section">
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="eyebrow" style={{ justifyContent: 'center' }}>Contact</div>
        <h2 className="section-title" style={{ marginBottom: 20 }}>Building something worth shipping?</h2>
        <p className="section-sub" style={{ margin: '0 auto 36px' }}>
          Open to product-focused engineering roles and internships, and to collaborating on
          fast, scoped builds.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={`mailto:${profile.email}`} className="btn btn-primary">{profile.email}</a>
          <a href={`tel:${profile.phone}`} className="btn mono">{profile.phone}</a>
          {profile.linkedin && (
            <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer" className="btn mono">{profile.linkedin}</a>
          )}
          {profile.github && (
            <a href={`https://${profile.github}`} target="_blank" rel="noreferrer" className="btn mono">{profile.github}</a>
          )}
        </div>
      </div>
    </section>
  );
}
