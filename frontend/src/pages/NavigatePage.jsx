import React, { useState } from 'react';
import './NavigatePage.css';

const ROUTE_OPTIONS = ['Safest Route', 'Balanced Route', 'Fastest Route'];

export default function NavigatePage() {
  const [route, setRoute] = useState('Safest Route');
  const [aiVoice, setAiVoice] = useState(true);
  const [shareRoute, setShareRoute] = useState(false);
  const [source, setSource] = useState('');
  const [dest, setDest] = useState('');
  const [showRoute, setShowRoute] = useState(false);

  const handleSearch = () => { if (source && dest) setShowRoute(true); };

  return (
    <div className="navigate-page">
      <div className="nav-spacer" />
      <div className="navigate-layout">

        {/* Left panel */}
        <div className="nav-panel glass">
          <h2>🗺️ Safe Route Navigation</h2>
          <p className="nav-sub">Find the safest path from A to B.</p>

          <div className="nav-inputs">
            <div className="nav-input-group">
              <label>📍 Source</label>
              <input className="nav-input" placeholder="Enter starting point" value={source} onChange={e=>setSource(e.target.value)} />
            </div>
            <div className="route-line-indicator">
              <div className="rli-dot start" />
              <div className="rli-line" />
              <div className="rli-dot end" />
            </div>
            <div className="nav-input-group">
              <label>🏁 Destination</label>
              <input className="nav-input" placeholder="Enter destination" value={dest} onChange={e=>setDest(e.target.value)} />
            </div>
          </div>

          {/* Route Options */}
          <div className="route-options">
            {ROUTE_OPTIONS.map(r => (
              <button key={r} className={`route-option-btn ${route===r?'active':''}`} onClick={()=>setRoute(r)}>
                {r === 'Safest Route' && '🛡️ '}
                {r === 'Balanced Route' && '⚖️ '}
                {r === 'Fastest Route' && '⚡ '}
                {r}
              </button>
            ))}
          </div>

          <button className="btn-primary" style={{ width:'100%', marginBottom:'1.2rem' }} onClick={handleSearch}>
            Find Route
          </button>

          {/* Toggles */}
          <div className="nav-toggles">
            <div className="toggle-row">
              <div>
                <div className="toggle-label">🔊 AI Voice Guide</div>
                <div className="toggle-desc">Audio alerts as you navigate</div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={aiVoice} onChange={e=>setAiVoice(e.target.checked)} />
                <span className="toggle-slider" />
              </label>
            </div>
            <div className="toggle-row">
              <div>
                <div className="toggle-label">📤 Share Route</div>
                <div className="toggle-desc">Send to trusted contact</div>
              </div>
              <label className="toggle-switch">
                <input type="checkbox" checked={shareRoute} onChange={e=>setShareRoute(e.target.checked)} />
                <span className="toggle-slider" />
              </label>
            </div>
          </div>

          {/* Route summary */}
          {showRoute && (
            <div className="route-summary glass-light">
              <div className="rs-header">
                <span className="rs-label">Route Safety Score</span>
                <span className="rs-score">7.4/10</span>
              </div>
              <div className="rs-meta">
                <span>🕐 18 min</span>
                <span>📏 4.2 km</span>
                <span className="rs-safe">✅ Low Risk</span>
              </div>
              <div className="rs-warnings">
                <div className="rs-warn">⚠️ 1 moderate zone at km 2.1</div>
                <div className="rs-info">🚔 2 police stations on route</div>
                <div className="rs-info">☕ 3 safe rest stops</div>
              </div>
            </div>
          )}
        </div>

        {/* Map */}
        <div className="nav-map glass">
          <div className="nav-map-inner">
            <svg viewBox="0 0 100 100" className="nav-map-svg">
              {/* Grid */}
              {[10,20,30,40,50,60,70,80,90].map(x=>(
                <React.Fragment key={x}>
                  <line x1={x} y1="0" x2={x} y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="0.3"/>
                  <line x1="0" y1={x} x2="100" y2={x} stroke="rgba(255,255,255,0.03)" strokeWidth="0.3"/>
                </React.Fragment>
              ))}
              {/* Streets */}
              <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2"/>
              <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2"/>
              <line x1="20" y1="0" x2="80" y2="100" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7"/>
              <line x1="0" y1="30" x2="100" y2="70" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7"/>

              {showRoute && <>
                {/* Safe green path */}
                <path d="M 20 80 C 30 70, 40 55, 50 50 S 70 35, 80 20"
                  stroke="#00c864" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="0"/>
                {/* Moderate yellow segment */}
                <path d="M 50 50 C 55 47, 60 43, 65 40"
                  stroke="#ffb400" strokeWidth="2" fill="none" strokeLinecap="round"/>
                {/* Source */}
                <circle cx="20" cy="80" r="2.5" fill="#e91e8c" />
                <circle cx="20" cy="80" r="4.5" fill="none" stroke="#e91e8c" strokeWidth="0.8" opacity="0.5"/>
                {/* Dest */}
                <circle cx="80" cy="20" r="2.5" fill="#00c864" />
                {/* Police */}
                <text x="42" y="52" fontSize="3">🚔</text>
                <text x="68" y="38" fontSize="3">🚔</text>
                {/* Rest stop */}
                <text x="55" y="46" fontSize="3">☕</text>
              </>}

              {!showRoute && (
                <text x="50" y="52" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="4" fontFamily="Poppins">
                  Enter route to begin
                </text>
              )}
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
}