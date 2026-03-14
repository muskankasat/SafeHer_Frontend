import './HomePage.css';

const quickActions = [
  { icon: '🗺️', label: 'Navigate Safely', page: 'navigate', color: '#e91e8c' },
  { icon: '🏨', label: 'Safe Hotels', page: 'hotels', color: '#9c27b0' },
  { icon: '📣', label: 'Report Problem', page: 'report', color: '#e91e8c' },
  { icon: '🚨', label: 'SOS Emergency', page: 'sos', color: '#f43f5e' },
  { icon: '🚖', label: 'Book Safe Cab', page: 'cab', color: '#9c27b0' },
];

const policeStations = [
  { name: 'Sector 14 Police Station', dist: '0.8 km', phone: '100' },
  { name: 'MG Road Women Cell', dist: '1.2 km', phone: '1091' },
  { name: 'Central Police HQ', dist: '2.5 km', phone: '100' },
];

const alerts = [
  { type: 'warning', time: '2h ago', msg: 'Suspicious activity reported near Metro Station C' },
  { type: 'danger', time: '4h ago', msg: 'Poor lighting on NH-7 stretch, avoid after 9 PM' },
  { type: 'info', time: '6h ago', msg: 'New patrol added at Sector 22 market' },
];

export default function HomePage({ onNavigate }) {
  return (
    <div className="home-page">
      <div className="nav-spacer" />
      <div className="container">
        {/* Welcome */}
        <div className="home-welcome">
          <div>
            <h1>Welcome back, <span className="pink">Priya</span> 👋</h1>
            <p>Stay safe today. Here's your area overview.</p>
          </div>
          <div className="badge"><span className="dot-pink" />Live Safety Mode</div>
        </div>

        {/* Top grid */}
        <div className="home-top-grid">
          {/* Safety Score Card */}
          <div className="safety-score-card glass">
            <div className="score-header">
              <div>
                <div className="score-label">Safety Score · Current Area</div>
                <div className="score-location">📍 Connaught Place, Delhi</div>
              </div>
              <div className="score-circle">
                <svg viewBox="0 0 80 80" width="80" height="80">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6"/>
                  <circle cx="40" cy="40" r="32" fill="none" stroke="url(#scoreGrad)" strokeWidth="6"
                    strokeDasharray="201" strokeDashoffset="60" strokeLinecap="round" transform="rotate(-90 40 40)"/>
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#e91e8c"/>
                      <stop offset="100%" stopColor="#f43f5e"/>
                    </linearGradient>
                  </defs>
                  <text x="40" y="44" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="800" fontFamily="Poppins">7.2</text>
                </svg>
              </div>
            </div>
            <div className="score-meta">
              <span className="score-badge moderate">Moderate</span>
              <span style={{ fontSize:'0.8rem', color:'var(--text-secondary)' }}>Out of 10 · Updated 5 min ago</span>
            </div>
            <div className="score-factors">
              <div className="factor"><span>🚔</span> Police presence: <strong>High</strong></div>
              <div className="factor"><span>💡</span> Street lighting: <strong>Moderate</strong></div>
              <div className="factor"><span>👥</span> Crowd level: <strong>High</strong></div>
            </div>
            <button className="btn-secondary" style={{ width:'100%', marginTop:'1rem' }} onClick={() => onNavigate('heatmap')}>
              View Full Heatmap
            </button>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-card glass">
            <h3 className="card-title">Quick Actions</h3>
            <div className="quick-actions-grid">
              {quickActions.map((a) => (
                <button key={a.label} className="quick-action-btn" onClick={() => onNavigate(a.page)}
                  style={{ '--action-color': a.color }}>
                  <span className="qa-icon">{a.icon}</span>
                  <span className="qa-label">{a.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom grid */}
        <div className="home-bottom-grid">
          {/* Police stations */}
          <div className="info-card glass">
            <h3 className="card-title">🚔 Nearby Police Stations</h3>
            <div className="police-list">
              {policeStations.map((p) => (
                <div key={p.name} className="police-item">
                  <div>
                    <div className="police-name">{p.name}</div>
                    <div className="police-dist">{p.dist} away</div>
                  </div>
                  <a href={`tel:${p.phone}`} className="btn-call">📞 {p.phone}</a>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Alerts */}
          <div className="info-card glass">
            <h3 className="card-title">⚠️ Recent Safety Alerts</h3>
            <div className="alert-list">
              {alerts.map((a, i) => (
                <div key={i} className={`alert-item alert-${a.type}`}>
                  <div className="alert-dot" />
                  <div>
                    <div className="alert-msg">{a.msg}</div>
                    <div className="alert-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-ghost" style={{ width:'100%', marginTop:'1rem' }} onClick={() => onNavigate('report')}>
              + Report an Incident
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}