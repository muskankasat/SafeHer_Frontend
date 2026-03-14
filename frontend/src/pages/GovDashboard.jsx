import { useState } from 'react';
import './GovDashboard.css';

const INCIDENTS = [
  { id:'#INC-1024', type:'Harassment', location:'Paharganj, Delhi', time:'2h ago', severity:'high', status:'Open' },
  { id:'#INC-1023', type:'Poor Lighting', location:'NH-7 Stretch', time:'4h ago', severity:'medium', status:'In Review' },
  { id:'#INC-1022', type:'Suspicious Activity', location:'Lajpat Nagar Metro', time:'5h ago', severity:'medium', status:'Resolved' },
  { id:'#INC-1021', type:'Unsafe Street', location:'Old Delhi Chowk', time:'8h ago', severity:'high', status:'Open' },
  { id:'#INC-1020', type:'Transport Safety', location:'Dwarka Sec 9', time:'12h ago', severity:'low', status:'Resolved' },
  { id:'#INC-1019', type:'Harassment', location:'Saket Mall Road', time:'1d ago', severity:'high', status:'In Review' },
];

const AI_INSIGHTS = [
  { icon:'🔴', text:'Paharganj area shows 34% spike in incidents — recommend doubling night patrols.' },
  { icon:'💡', text:'Street lights on NH-7 km 12-18 reported non-functional — maintenance alert issued.' },
  { icon:'📸', text:'3 CCTV cameras offline in Old Delhi cluster — flagged for repair.' },
  { icon:'🚔', text:'Model suggests 2 additional patrol units needed in South Delhi on weekends.' },
  { icon:'📈', text:'Month-on-month incident drop of 18% in Dwarka — community policing effective.' },
];

const INFRA_ALERTS = [
  { item:'Street Light Cluster B7', area:'Paharganj', issue:'12 lights non-functional', priority:'High' },
  { item:'CCTV Node 44', area:'Old Delhi', issue:'Offline 36+ hours', priority:'High' },
  { item:'Emergency Call Box', area:'Lajpat Nagar', issue:'Out of order', priority:'Medium' },
  { item:'Street Light Cluster C3', area:'Rohini', issue:'Dimming below threshold', priority:'Low' },
];

const TOP_AREAS = [
  { name:'Paharganj', reports:142, score:3.1, trend:'up' },
  { name:'Old Delhi', reports:118, score:2.9, trend:'up' },
  { name:'Karol Bagh', reports:87, score:4.8, trend:'stable' },
  { name:'Lajpat Nagar', reports:65, score:5.8, trend:'down' },
  { name:'Saket', reports:14, score:8.4, trend:'down' },
];

export default function GovDashboard({ onNavigate }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState('overview');

  const NAV_ITEMS = [
    { id:'overview', icon:'📊', label:'Overview' },
    { id:'incidents', icon:'📋', label:'Incidents' },
    { id:'heatmap', icon:'🗺️', label:'Heatmap Analytics' },
    { id:'insights', icon:'🤖', label:'AI Insights' },
    { id:'infrastructure', icon:'🔧', label:'Infrastructure' },
    { id:'community', icon:'👥', label:'Community Reports' },
  ];

  return (
    <div className="gov-layout">
      {/* Admin sidebar */}
      <aside className={`gov-sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        <div className="gov-sidebar-header">
          <div className="gov-logo">
            <span className="gov-logo-icon">🏛️</span>
            {sidebarOpen && <span className="gov-logo-text">SafeHer Gov</span>}
          </div>
          <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        <nav className="gov-nav">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`gov-nav-item ${activeNav === item.id ? 'active' : ''}`}
              onClick={() => setActiveNav(item.id)}
              title={!sidebarOpen ? item.label : ''}
            >
              <span className="gov-nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="gov-nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="gov-sidebar-footer">
          <button className="gov-nav-item" onClick={() => onNavigate('home')} title="Back to App">
            <span className="gov-nav-icon">↩</span>
            {sidebarOpen && <span className="gov-nav-label">Back to App</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="gov-main">
        <div className="gov-topbar">
          <div>
            <h1 className="gov-page-title">
              {NAV_ITEMS.find(n => n.id === activeNav)?.icon} {NAV_ITEMS.find(n => n.id === activeNav)?.label}
            </h1>
            <p className="gov-page-sub">Government Administration Dashboard · Delhi NCR</p>
          </div>
          <div className="gov-topbar-actions">
            <div className="gov-live-badge"><span className="dot-pink"/>Live Data</div>
            <button className="btn-primary" style={{ fontSize: '0.82rem', padding: '0.5rem 1.2rem' }}>
              Export Report
            </button>
          </div>
        </div>

        <div className="gov-content">

          {/* OVERVIEW */}
          {(activeNav === 'overview' || activeNav === 'heatmap') && (
            <>
              {/* KPI widgets */}
              <div className="gov-kpis">
                <div className="kpi-card kpi-danger">
                  <div className="kpi-icon">🚨</div>
                  <div className="kpi-value">248</div>
                  <div className="kpi-label">Total Incidents (30d)</div>
                  <div className="kpi-trend up">↑ 12% vs last month</div>
                </div>
                <div className="kpi-card kpi-warning">
                  <div className="kpi-icon">⚠️</div>
                  <div className="kpi-value">4</div>
                  <div className="kpi-label">High-Risk Areas</div>
                  <div className="kpi-trend stable">→ No change</div>
                </div>
                <div className="kpi-card kpi-success">
                  <div className="kpi-icon">✅</div>
                  <div className="kpi-value">183</div>
                  <div className="kpi-label">Reports Resolved</div>
                  <div className="kpi-trend down">↓ 8% resolution time</div>
                </div>
                <div className="kpi-card kpi-info">
                  <div className="kpi-icon">👥</div>
                  <div className="kpi-value">12,450</div>
                  <div className="kpi-label">Active Women Users</div>
                  <div className="kpi-trend up">↑ 23% this month</div>
                </div>
              </div>

              {/* Heatmap + AI side by side */}
              <div className="gov-two-col">
                <div className="gov-card">
                  <div className="gov-card-header">
                    <h3>City Safety Heatmap</h3>
                    <select className="admin-select"><option>Last 30 days</option><option>Last 7 days</option></select>
                  </div>
                  <div className="admin-map">
                    <svg viewBox="0 0 100 100" width="100%" height="100%">
                      {[15,30,45,60,75].map(x=>(
                        <g key={x}>
                          <line x1={x} y1="0" x2={x} y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="0.3"/>
                          <line x1="0" y1={x} x2="100" y2={x} stroke="rgba(255,255,255,0.04)" strokeWidth="0.3"/>
                        </g>
                      ))}
                      {/* Zone blobs */}
                      <circle cx="44" cy="28" r="10" fill="rgba(244,63,94,0.3)" />
                      <circle cx="38" cy="42" r="8" fill="rgba(244,63,94,0.25)" />
                      <circle cx="58" cy="55" r="7" fill="rgba(255,180,0,0.25)" />
                      <circle cx="24" cy="60" r="9" fill="rgba(0,200,100,0.25)" />
                      <circle cx="52" cy="72" r="8" fill="rgba(0,200,100,0.22)" />
                      <circle cx="30" cy="20" r="6" fill="rgba(255,180,0,0.2)" />
                      {/* Labels */}
                      {[{x:44,y:28,l:'Old Delhi'},{x:38,y:42,l:'Paharganj'},{x:58,y:55,l:'Lajpat'},{x:24,y:60,l:'Dwarka'},{x:52,y:72,l:'Saket'},{x:30,y:20,l:'Rohini'}].map(z=>(
                        <text key={z.l} x={z.x} y={z.y+5} textAnchor="middle" fontSize="2.5" fill="rgba(255,255,255,0.6)" fontFamily="Poppins">{z.l}</text>
                      ))}
                    </svg>
                  </div>
                </div>

                <div className="gov-card">
                  <div className="gov-card-header">
                    <h3>🤖 AI-Generated Insights</h3>
                  </div>
                  <div className="insight-list">
                    {AI_INSIGHTS.map((ins, i) => (
                      <div key={i} className="insight-item">
                        <span className="insight-icon">{ins.icon}</span>
                        <span className="insight-text">{ins.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* INCIDENTS */}
          {(activeNav === 'incidents' || activeNav === 'overview') && (
            <div className="gov-card">
              <div className="gov-card-header">
                <h3>📋 Recent Safety Reports</h3>
                <div className="gov-card-actions">
                  <select className="admin-select"><option>All Types</option><option>Harassment</option><option>Lighting</option></select>
                  <select className="admin-select"><option>All Status</option><option>Open</option><option>Resolved</option></select>
                </div>
              </div>
              <div className="incidents-table-wrapper">
                <table className="incidents-table">
                  <thead>
                    <tr>
                      <th>ID</th><th>Type</th><th>Location</th><th>Time</th><th>Severity</th><th>Status</th><th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {INCIDENTS.map(inc => (
                      <tr key={inc.id}>
                        <td className="incident-id">{inc.id}</td>
                        <td>{inc.type}</td>
                        <td className="incident-location">{inc.location}</td>
                        <td className="incident-time">{inc.time}</td>
                        <td>
                          <span className={`severity-pill sev-${inc.severity}`}>
                            {inc.severity.charAt(0).toUpperCase()+inc.severity.slice(1)}
                          </span>
                        </td>
                        <td>
                          <span className={`status-pill status-${inc.status.toLowerCase().replace(' ','-')}`}>
                            {inc.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn-table-action">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* INFRASTRUCTURE */}
          {(activeNav === 'infrastructure' || activeNav === 'overview') && (
            <div className="gov-card">
              <div className="gov-card-header">
                <h3>🔧 Infrastructure Alerts</h3>
                <span className="badge" style={{ fontSize:'0.72rem' }}>4 pending</span>
              </div>
              <div className="infra-list">
                {INFRA_ALERTS.map((a, i) => (
                  <div key={i} className={`infra-item infra-${a.priority.toLowerCase()}`}>
                    <div className="infra-info">
                      <div className="infra-name">{a.item}</div>
                      <div className="infra-area">📍 {a.area} · {a.issue}</div>
                    </div>
                    <div className="infra-right">
                      <span className={`severity-pill sev-${a.priority.toLowerCase()}`}>{a.priority}</span>
                      <button className="btn-table-action">Assign</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TOP RISK AREAS */}
          {(activeNav === 'community' || activeNav === 'overview') && (
            <div className="gov-card">
              <div className="gov-card-header">
                <h3>📍 Most Reported Areas</h3>
              </div>
              <div className="risk-areas-list">
                {TOP_AREAS.map((a, i) => (
                  <div key={i} className="risk-area-item">
                    <div className="ra-rank">{i + 1}</div>
                    <div className="ra-name">{a.name}</div>
                    <div className="ra-bar-wrapper">
                      <div className="ra-bar" style={{ width: `${(a.reports / 142) * 100}%`, background: a.score < 4 ? '#f43f5e' : a.score < 7 ? '#ffb400' : '#00c864' }} />
                    </div>
                    <div className="ra-reports">{a.reports} reports</div>
                    <div className={`ra-score ${a.score < 4 ? 'danger' : a.score < 7 ? 'moderate' : 'safe'}`}>{a.score}</div>
                    <div className={`ra-trend trend-${a.trend}`}>
                      {a.trend === 'up' ? '↑' : a.trend === 'down' ? '↓' : '→'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}