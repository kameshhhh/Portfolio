import { useEffect, useState } from 'react';

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#track-record', label: 'Track Record' },
  { href: '#contact', label: 'Contact' }
];

export default function Nav({ profile }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(10,14,20,0.82)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 200ms ease, border-color 200ms ease'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <a href="#top" className="mono" style={{ fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, background: 'var(--signal)', display: 'inline-block' }} />
          {profile.name.toUpperCase()}
        </a>
        <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="mono"
              style={{ fontSize: 13, color: 'var(--text-muted)', display: window.innerWidth < 720 ? 'none' : 'inline' }}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary" style={{ padding: '9px 18px', fontSize: 13 }}>
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}
