import { useState } from 'react';
import './ProfilePage.css';

const TABS = ['Info', 'Contacts', 'History', 'Settings'];

const travelHistory = [
  { from: 'Connaught Place', to: 'Saket', date: 'Mar 12, 2025', safety: 8.1 },
  { from: 'Lajpat Nagar', to: 'Dwarka', date: 'Mar 10, 2025', safety: 7.4 },
  { from: 'Old Delhi', to: 'Rohini', date: 'Mar 8, 2025', safety: 5.6 },
];

const reportHistory = [
  { type: 'Poor Lighting', location: 'NH-7 Stretch', date: 'Mar 11, 2025', status: 'Under Review' },
  { type: 'Suspicious Activity', location: 'Paharganj Metro', date: 'Mar 7, 2025', status: 'Resolved' },
];

const contacts = [
  { name: 'Anita (Mom)', phone: '+91 98765 43210', relation: 'Family' },
  { name: 'Riya Sharma', phone: '+91 87654 32109', relation: 'Friend' },
  { name: 'Emergency Services', phone: '112', relation: 'Emergency' },
];

export default function ProfilePage({ onNavigate }) {
  const [tab, setTab] = useState('Info');
  const [notifSafety, setNotifSafety] = useState(true);
  const [notifAlert, setNotifAlert] = useState(true);
  const [notifCommunity, setNotifCommunity] = useState(false);
  const [privLocation, setPrivLocation] = useState(true);

  return (
    <div className="profile-page">
      <div className="nav-spacer"/>
      <div className="container">
        <div className="profile-layout">
          {/* Sidebar */}
          <div className="profile-sidebar glass">
            <div className="profile-avatar">P</div>
            <div className="profile-name">Priya Sharma</div>
            <div className="profile-email">priya.sharma@gmail.com</div>
            <div className="profile-badges">
              <span className="profile-badge verified">✓ Aadhaar Verified</span>
              <span className="profile-badge active"><span className="dot-pink"/>Active User</span>
            </div>
            <div className="profile-stats">
              <div className="ps-stat"><span className="ps-num">12</span><span>Trips</span></div>
              <div className="ps-stat"><span className="ps-num">3</span><span>Reports</span></div>
              <div className="ps-stat"><span className="ps-num">9.1</span><span>Avg Safety</span></div>
            </div>
            <button className="btn-secondary" style={{ width: '100%', marginTop: '1rem' }}
              onClick={() => onNavigate('gov')}>
              Gov Dashboard ↗
            </button>
          </div>

          {/* Main */}
          <div className="profile-main glass">
            <div className="profile-tabs">
              {TABS.map(t => (
                <button key={t} className={`profile-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                  {t}
                </button>
              ))}
            </div>

            <div className="profile-tab-content">

              {/* INFO */}
              {tab === 'Info' && (
                <div className="tab-info">
                  <div className="info-field">
                    <label>Full Name</label>
                    <div className="info-value">Priya Sharma</div>
                  </div>
                  <div className="info-field">
                    <label>Email</label>
                    <div className="info-value">priya.sharma@gmail.com</div>
                  </div>
                  <div className="info-field">
                    <label>Phone</label>
                    <div className="info-value">+91 98765 43210</div>
                  </div>
                  <div className="info-field">
                    <label>Aadhaar Verification</label>
                    <div className="info-value verified-text">✓ Verified · Last checked Mar 2025</div>
                  </div>
                  <div className="info-field">
                    <label>Member Since</label>
                    <div className="info-value">January 2024</div>
                  </div>
                  <button className="btn-primary" style={{ marginTop: '0.5rem' }}>Edit Profile</button>
                </div>
              )}

              {/* CONTACTS */}
              {tab === 'Contacts' && (
                <div className="tab-contacts">
                  <div className="contacts-list">
                    {contacts.map((c, i) => (
                      <div key={i} className="contact-item glass-light">
                        <div className="contact-avatar">{c.name[0]}</div>
                        <div className="contact-info">
                          <div className="contact-name">{c.name}</div>
                          <div className="contact-phone">{c.phone}</div>
                          <span className="contact-relation">{c.relation}</span>
                        </div>
                        <div className="contact-actions">
                          <button className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem' }}>Edit</button>
                          <button className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem', color: '#f43f5e' }}>Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="btn-primary" style={{ marginTop: '1rem' }}>
                    + Add Emergency Contact
                  </button>
                </div>
              )}

              {/* HISTORY */}
              {tab === 'History' && (
                <div className="tab-history">
                  <h4>Travel History</h4>
                  <div className="history-list">
                    {travelHistory.map((t, i) => (
                      <div key={i} className="history-item glass-light">
                        <div className="hi-route">
                          <span>{t.from}</span>
                          <span className="hi-arrow">→</span>
                          <span>{t.to}</span>
                        </div>
                        <div className="hi-meta">
                          <span className="hi-date">{t.date}</span>
                          <span className={`hi-score ${t.safety >= 7 ? 'safe' : 'moderate'}`}>
                            ⭐ {t.safety}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h4 style={{ marginTop: '1.5rem' }}>Reports Submitted</h4>
                  <div className="history-list">
                    {reportHistory.map((r, i) => (
                      <div key={i} className="history-item glass-light">
                        <div className="hi-route">
                          <span>{r.type}</span>
                          <span className="hi-arrow">·</span>
                          <span style={{ color: 'var(--text-muted)' }}>{r.location}</span>
                        </div>
                        <div className="hi-meta">
                          <span className="hi-date">{r.date}</span>
                          <span className={`hi-score ${r.status === 'Resolved' ? 'safe' : 'moderate'}`}>
                            {r.status === 'Resolved' ? '✅' : '⏳'} {r.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SETTINGS */}
              {tab === 'Settings' && (
                <div className="tab-settings">
                  <div className="settings-section">
                    <h4>Notifications</h4>
                    <div className="settings-list">
                      <div className="settings-row">
                        <div>
                          <div className="sr-label">Safety Alerts</div>
                          <div className="sr-desc">Get notified about danger zones near you</div>
                        </div>
                        <label className="toggle-switch">
                          <input type="checkbox" checked={notifSafety} onChange={e => setNotifSafety(e.target.checked)} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="settings-row">
                        <div>
                          <div className="sr-label">Incident Alerts</div>
                          <div className="sr-desc">New reports near your frequent routes</div>
                        </div>
                        <label className="toggle-switch">
                          <input type="checkbox" checked={notifAlert} onChange={e => setNotifAlert(e.target.checked)} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                      <div className="settings-row">
                        <div>
                          <div className="sr-label">Community Updates</div>
                          <div className="sr-desc">Feedback and tips from the community</div>
                        </div>
                        <label className="toggle-switch">
                          <input type="checkbox" checked={notifCommunity} onChange={e => setNotifCommunity(e.target.checked)} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="settings-section">
                    <h4>Privacy</h4>
                    <div className="settings-list">
                      <div className="settings-row">
                        <div>
                          <div className="sr-label">Share Location Data</div>
                          <div className="sr-desc">Help improve heatmap accuracy</div>
                        </div>
                        <label className="toggle-switch">
                          <input type="checkbox" checked={privLocation} onChange={e => setPrivLocation(e.target.checked)} />
                          <span className="toggle-slider" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="settings-section">
                    <h4>Voice Assistant</h4>
                    <button className="btn-secondary" onClick={() => onNavigate('voice')}>
                      Configure Voice Guide →
                    </button>
                  </div>

                  <button className="btn-ghost" style={{ color: '#f43f5e', borderColor: 'rgba(244,63,94,0.3)', marginTop: '1rem' }}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}