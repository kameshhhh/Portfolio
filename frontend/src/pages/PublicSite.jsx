import { useEffect, useState } from 'react';
import { getPortfolio } from '../api';
import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Skills from '../components/Skills.jsx';
import Projects from '../components/Projects.jsx';
import Hackathons from '../components/Hackathons.jsx';
import Contact from '../components/Contact.jsx';
import Footer from '../components/Footer.jsx';

export default function PublicSite() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getPortfolio()
      .then((res) => { if (!cancelled) setData(res); })
      .catch((err) => { if (!cancelled) setError(err.message); });
    return () => { cancelled = true; };
  }, []);

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: 'var(--danger)', fontFamily: 'var(--font-mono)', padding: 24, textAlign: 'center' }}>
        Could not load portfolio data — is the backend running on port 5050?
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        loading portfolio…
      </div>
    );
  }

  return (
    <>
      <Nav profile={data.profile} />
      <Hero profile={data.profile} />
      <About profile={data.profile} certifications={data.certifications} />
      <Skills skills={data.skills} />
      <Projects projects={data.projects} />
      <Hackathons hackathons={data.hackathons} education={data.education} />
      <Contact profile={data.profile} />
      <Footer profile={data.profile} />
    </>
  );
}
