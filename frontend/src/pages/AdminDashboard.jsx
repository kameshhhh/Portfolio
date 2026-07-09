import { useEffect, useState } from 'react';
import { getPortfolio, savePortfolio, uploadImage } from '../api';
import { useAuth } from '../context/AuthContext.jsx';

const TABS = ['Profile', 'Skills', 'Projects', 'Hackathons', 'Education', 'Certifications'];

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('Profile');
  const [status, setStatus] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const { username, signOut } = useAuth();

  useEffect(() => {
    getPortfolio().then(setData).catch((e) => setLoadError(e.message));
  }, []);

  async function handleSave() {
    setStatus('saving');
    try {
      await savePortfolio(data);
      setStatus('saved');
      setTimeout(() => setStatus(null), 2000);
    } catch (e) {
      setStatus('error: ' + e.message);
    }
  }

  if (loadError) {
    return <CenterMsg color="var(--danger)">Could not load data — {loadError}</CenterMsg>;
  }
  if (!data) {
    return <CenterMsg>loading dashboard…</CenterMsg>;
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <header style={{ borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, background: 'rgba(10,14,20,0.9)', backdropFilter: 'blur(10px)', zIndex: 20 }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div className="mono" style={{ fontSize: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, background: 'var(--signal)' }} />
            admin · {username}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {status && (
              <span className="mono" style={{ fontSize: 12, color: status.startsWith('error') ? 'var(--danger)' : 'var(--signal)' }}>
                {status === 'saving' ? 'saving…' : status === 'saved' ? 'saved ✓' : status}
              </span>
            )}
            <button className="btn btn-primary" onClick={handleSave}>Save changes</button>
            <a href="/" className="btn">View site</a>
            <button className="btn" onClick={signOut}>Sign out</button>
          </div>
        </div>
      </header>

      <div className="container" style={{ paddingTop: 32, display: 'flex', gap: 32 }}>
        <nav style={{ width: 180, flexShrink: 0 }}>
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="mono"
              style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px',
                background: tab === t ? 'var(--bg-panel-raised)' : 'transparent',
                border: 'none', borderLeft: tab === t ? '2px solid var(--signal)' : '2px solid transparent',
                color: tab === t ? 'var(--text-primary)' : 'var(--text-muted)', fontSize: 13, marginBottom: 4
              }}
            >
              {t}
            </button>
          ))}
        </nav>

        <main style={{ flex: 1, paddingBottom: 80, minWidth: 0 }}>
          {tab === 'Profile' && <ProfileTab data={data} setData={setData} />}
          {tab === 'Skills' && <SkillsTab data={data} setData={setData} />}
          {tab === 'Projects' && <ProjectsTab data={data} setData={setData} />}
          {tab === 'Hackathons' && <ListTab
            data={data} setData={setData} field="hackathons"
            fields={[{ key: 'name', label: 'Name' }, { key: 'note', label: 'Note' }]}
            newItem={{ name: 'New hackathon', note: '' }}
          />}
          {tab === 'Education' && <ListTab
            data={data} setData={setData} field="education"
            fields={[{ key: 'school', label: 'School / Program' }, { key: 'detail', label: 'Detail' }, { key: 'years', label: 'Years' }]}
            newItem={{ school: 'New institution', detail: '', years: '' }}
          />}
          {tab === 'Certifications' && <ListTab
            data={data} setData={setData} field="certifications"
            fields={[{ key: 'name', label: 'Name' }, { key: 'issuer', label: 'Issuer' }, { key: 'grade', label: 'Grade' }, { key: 'date', label: 'Date' }]}
            newItem={{ name: 'New certification', issuer: '', grade: '', date: '' }}
          />}
        </main>
      </div>
    </div>
  );
}

function CenterMsg({ children, color }) {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', color: color || 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
      {children}
    </div>
  );
}

function ProfileTab({ data, setData }) {
  const p = data.profile;
  function update(key, value) {
    setData({ ...data, profile: { ...p, [key]: value } });
  }

  const textFields = [
    ['name', 'Name'], ['title', 'Title'], ['email', 'Email'], ['phone', 'Phone'],
    ['linkedin', 'LinkedIn'], ['github', 'GitHub'], ['education_line', 'Education line']
  ];

  return (
    <div className="card" style={{ padding: 28, maxWidth: 640 }}>
      <SectionHeading title="Profile" sub="Core identity shown in the nav, hero, and contact section." />
      {textFields.map(([key, label]) => (
        <div className="field" key={key}>
          <label>{label}</label>
          <input value={p[key] || ''} onChange={(e) => update(key, e.target.value)} />
        </div>
      ))}
      <div className="field">
        <label>Tagline (hero headline)</label>
        <textarea rows={2} value={p.tagline || ''} onChange={(e) => update('tagline', e.target.value)} />
      </div>
      <div className="field">
        <label>Summary</label>
        <textarea rows={5} value={p.summary || ''} onChange={(e) => update('summary', e.target.value)} />
      </div>
    </div>
  );
}

function SkillsTab({ data, setData }) {
  const skills = data.skills;

  function updateGroupName(oldName, newName) {
    if (!newName || newName === oldName) return;
    const entries = Object.entries(skills).map(([k, v]) => (k === oldName ? [newName, v] : [k, v]));
    setData({ ...data, skills: Object.fromEntries(entries) });
  }
  function updateItems(group, itemsStr) {
    const items = itemsStr.split(',').map((s) => s.trim()).filter(Boolean);
    setData({ ...data, skills: { ...skills, [group]: items } });
  }
  function removeGroup(group) {
    const clone = { ...skills };
    delete clone[group];
    setData({ ...data, skills: clone });
  }
  function addGroup() {
    setData({ ...data, skills: { ...skills, 'New Group': [] } });
  }

  return (
    <div>
      <SectionHeading title="Skills" sub="Comma-separated items within each group." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {Object.entries(skills).map(([group, items]) => (
          <div key={group} className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <input
                defaultValue={group}
                onBlur={(e) => updateGroupName(group, e.target.value)}
                className="mono"
                style={{ background: 'var(--bg)', border: '1px solid var(--border-strong)', borderRadius: 6, padding: '8px 10px', color: 'var(--text-primary)', fontWeight: 600, flex: 1 }}
              />
              <button className="btn" onClick={() => removeGroup(group)} style={{ color: 'var(--danger)' }}>Remove</button>
            </div>
            <textarea
              rows={2}
              defaultValue={items.join(', ')}
              onBlur={(e) => updateItems(group, e.target.value)}
              style={{ width: '100%', background: 'var(--bg)', border: '1px solid var(--border-strong)', borderRadius: 6, padding: '10px 12px', color: 'var(--text-primary)', fontSize: 13.5 }}
            />
          </div>
        ))}
      </div>
      <button className="btn" style={{ marginTop: 20 }} onClick={addGroup}>+ Add skill group</button>
    </div>
  );
}

function ProjectsTab({ data, setData }) {
  const projects = data.projects;

  function updateProject(id, patch) {
    setData({ ...data, projects: projects.map((p) => (p.id === id ? { ...p, ...patch } : p)) });
  }
  function removeProject(id) {
    setData({ ...data, projects: projects.filter((p) => p.id !== id) });
  }
  function addProject() {
    const id = 'p' + Date.now();
    setData({
      ...data,
      projects: [...projects, { id, title: 'New project', meta: '', year: '', problem: '', flow: '', outcome: '', images: [] }]
    });
  }
  async function handleImageUpload(project, file) {
    try {
      const res = await uploadImage(file);
      updateProject(project.id, { images: [...(project.images || []), res.url] });
    } catch (e) {
      alert('Upload failed: ' + e.message);
    }
  }
  function removeImage(project, url) {
    updateProject(project.id, { images: project.images.filter((i) => i !== url) });
  }

  return (
    <div>
      <SectionHeading title="Projects" sub="Edit copy and attach screenshots. Save changes when done." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {projects.map((p) => (
          <div key={p.id} className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 4 }}>
              <div className="field" style={{ flex: 1 }}>
                <label>Title</label>
                <input value={p.title} onChange={(e) => updateProject(p.id, { title: e.target.value })} />
              </div>
              <div className="field" style={{ width: 140 }}>
                <label>Year</label>
                <input value={p.year} onChange={(e) => updateProject(p.id, { year: e.target.value })} />
              </div>
            </div>
            <div className="field">
              <label>Meta line (tools / track)</label>
              <input value={p.meta} onChange={(e) => updateProject(p.id, { meta: e.target.value })} />
            </div>
            <div className="field">
              <label>Problem</label>
              <textarea rows={2} value={p.problem} onChange={(e) => updateProject(p.id, { problem: e.target.value })} />
            </div>
            <div className="field">
              <label>Flow</label>
              <textarea rows={2} value={p.flow} onChange={(e) => updateProject(p.id, { flow: e.target.value })} />
            </div>
            <div className="field">
              <label>Shipped / outcome</label>
              <textarea rows={2} value={p.outcome} onChange={(e) => updateProject(p.id, { outcome: e.target.value })} />
            </div>

            <div className="field">
              <label>Screenshots</label>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                {(p.images || []).map((url) => (
                  <div key={url} style={{ position: 'relative' }}>
                    <img src={url} alt="" style={{ width: 100, height: 70, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--border-strong)' }} />
                    <button
                      onClick={() => removeImage(p, url)}
                      title="Remove screenshot"
                      style={{ position: 'absolute', top: -6, right: -6, width: 20, height: 20, borderRadius: '50%', border: 'none', background: 'var(--danger)', color: '#fff', fontSize: 12, lineHeight: '20px', padding: 0 }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files[0] && handleImageUpload(p, e.target.files[0])}
              />
            </div>

            <button className="btn" style={{ color: 'var(--danger)', marginTop: 8 }} onClick={() => removeProject(p.id)}>
              Remove project
            </button>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={addProject}>+ Add project</button>
    </div>
  );
}

function ListTab({ data, setData, field, fields, newItem }) {
  const items = data[field];

  function update(id, key, value) {
    setData({ ...data, [field]: items.map((it) => (it.id === id ? { ...it, [key]: value } : it)) });
  }
  function remove(id) {
    setData({ ...data, [field]: items.filter((it) => it.id !== id) });
  }
  function add() {
    setData({ ...data, [field]: [...items, { id: field[0] + Date.now(), ...newItem }] });
  }

  return (
    <div>
      <SectionHeading title={field[0].toUpperCase() + field.slice(1)} sub="Edit, remove, or add entries." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.map((item) => (
          <div key={item.id} className="card" style={{ padding: 20 }}>
            {fields.map((f) => (
              <div className="field" key={f.key}>
                <label>{f.label}</label>
                <input value={item[f.key] || ''} onChange={(e) => update(item.id, f.key, e.target.value)} />
              </div>
            ))}
            <button className="btn" style={{ color: 'var(--danger)' }} onClick={() => remove(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={add}>+ Add entry</button>
    </div>
  );
}

function SectionHeading({ title, sub }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>{title}</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 13.5 }}>{sub}</p>
    </div>
  );
}
