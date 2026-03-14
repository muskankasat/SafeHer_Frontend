import { useState } from 'react';
import './CabPage.css';

const CABS = [
  { id:1, driver:'Sunita Devi', rating:4.9, plate:'DL 3C 1234', safety:9.2, eta:'3 min', type:'Hatchback', verified:true },
  { id:2, driver:'Meena Sharma', rating:4.7, plate:'DL 7B 5678', safety:8.8, eta:'5 min', type:'Sedan', verified:true },
  { id:3, driver:'Rajesh Kumar', rating:4.5, plate:'DL 9A 9012', safety:7.4, eta:'8 min', type:'SUV', verified:true },
];

export default function CabPage() {
  const [booked, setBooked] = useState(null);
  const [monitoring, setMonitoring] = useState(false);

  return (
    <div className="cab-page">
      <div className="nav-spacer"/>
      <div className="cab-layout">
        {/* Map side */}
        <div className="cab-map glass">
          <div className="cab-map-header">
            <h2>🚖 Nearby Verified Cabs</h2>
            <div className="badge"><span className="dot-pink"/>3 cabs nearby</div>
          </div>
          <div className="cab-map-canvas">
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
              <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
              <line x1="20" y1="10" x2="80" y2="90" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6"/>
              {/* User location */}
              <circle cx="50" cy="55" r="3" fill="#e91e8c"/>
              <circle cx="50" cy="55" r="6" fill="none" stroke="#e91e8c" strokeWidth="0.8" opacity="0.4"/>
              <text x="50" y="65" textAnchor="middle" fontSize="2.5" fill="rgba(255,255,255,0.5)" fontFamily="Poppins">You</text>
              {/* Cabs */}
              <text x="35" y="38" fontSize="5" textAnchor="middle">🚖</text>
              <text x="35" y="44" textAnchor="middle" fontSize="2.5" fill="#00c864" fontFamily="Poppins">3 min</text>
              <text x="62" y="45" fontSize="5" textAnchor="middle">🚖</text>
              <text x="62" y="51" textAnchor="middle" fontSize="2.5" fill="#ffb400" fontFamily="Poppins">5 min</text>
              <text x="72" y="72" fontSize="5" textAnchor="middle">🚖</text>
              <text x="72" y="78" textAnchor="middle" fontSize="2.5" fill="#3b82f6" fontFamily="Poppins">8 min</text>
            </svg>
          </div>
        </div>

        {/* Cab list */}
        <div className="cab-list-panel">
          <h3>Available Cabs</h3>
          <div className="cab-list">
            {CABS.map(cab => (
              <div key={cab.id} className={`cab-card glass-light ${booked?.id===cab.id?'booked':''}`}>
                <div className="cab-header">
                  <div className="cab-driver-info">
                    <div className="cab-avatar">{cab.driver[0]}</div>
                    <div>
                      <div className="cab-driver-name">{cab.driver}</div>
                      <div className="cab-plate">{cab.plate}</div>
                    </div>
                  </div>
                  {cab.verified && <span className="verified-badge">✓ Verified</span>}
                </div>

                <div className="cab-stats">
                  <div className="cab-stat"><span className="cs-val">⭐ {cab.rating}</span><span className="cs-lbl">Rating</span></div>
                  <div className="cab-stat"><span className="cs-val safe-text">{cab.safety}</span><span className="cs-lbl">Safety Score</span></div>
                  <div className="cab-stat"><span className="cs-val">{cab.eta}</span><span className="cs-lbl">ETA</span></div>
                  <div className="cab-stat"><span className="cs-val">{cab.type}</span><span className="cs-lbl">Type</span></div>
                </div>

                {booked?.id === cab.id ? (
                  <div className="cab-booked-status">
                    <span>✅ Cab Booked!</span>
                    <div className="cab-booked-actions">
                      <button className="btn-secondary" style={{fontSize:'0.78rem',padding:'0.4rem 0.8rem'}}>📤 Share Ride</button>
                      <button
                        className={`btn-primary ${monitoring?'monitoring':''}`}
                        style={{fontSize:'0.78rem',padding:'0.4rem 0.8rem'}}
                        onClick={()=>setMonitoring(!monitoring)}
                      >
                        {monitoring ? '📍 Monitoring...' : '📍 Start Monitoring'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button className="btn-primary" style={{width:'100%',fontSize:'0.85rem',padding:'0.6rem'}}
                    onClick={()=>setBooked(cab)}>
                    Book This Cab
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}