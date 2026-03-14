import { useState } from 'react';
import './HotelsPage.css';

const HOTELS = [
  { id:1, name:'The Sanctuary Women\'s Hotel', score:9.2, dist:'0.4 km', cctv:true, staff:true, security:true, price:'₹2,400/night', img:'🏨', reviews:'Women-only floors, excellent staff responsiveness.' },
  { id:2, name:'Park Residency Delhi', score:8.1, dist:'1.1 km', cctv:true, staff:false, security:true, price:'₹1,800/night', img:'🏩', reviews:'Well-lit corridors, active security at all hours.' },
  { id:3, name:'Oasis Inn Saket', score:7.6, dist:'2.0 km', cctv:true, staff:true, security:false, price:'₹1,200/night', img:'🏪', reviews:'Friendly women staff, good neighborhood.' },
  { id:4, name:'SafeStay Connaught', score:9.5, dist:'0.8 km', cctv:true, staff:true, security:true, price:'₹3,100/night', img:'🏦', reviews:'Top-rated by women travelers. Excellent.' },
  { id:5, name:'Comfort Lodge Dwarka', score:7.0, dist:'3.5 km', cctv:false, staff:true, security:true, price:'₹900/night', img:'🏬', reviews:'Affordable, women staff available on request.' },
  { id:6, name:'Metro Suites Lajpat', score:8.8, dist:'1.6 km', cctv:true, staff:true, security:true, price:'₹2,000/night', img:'🏢', reviews:'Great location, professional security team.' },
];

export default function HotelsPage() {
  const [minScore, setMinScore] = useState(0);
  const [cctv, setCctv] = useState(false);
  const [womenStaff, setWomenStaff] = useState(false);
  const [security24, setSecurity24] = useState(false);
  const [mapView, setMapView] = useState(false);
  const [selected, setSelected] = useState(null);

  const filtered = HOTELS.filter(h =>
    h.score >= minScore &&
    (!cctv || h.cctv) &&
    (!womenStaff || h.staff) &&
    (!security24 || h.security)
  );

  return (
    <div className="hotels-page">
      <div className="nav-spacer" />
      <div className="hotels-layout">

        {/* Sidebar */}
        <div className="hotels-sidebar glass">
          <h3>🔍 Filter Hotels</h3>

          <div className="filter-group">
            <label>Min. Safety Rating: {minScore}+</label>
            <input type="range" min="0" max="9" step="0.5" value={minScore}
              onChange={e=>setMinScore(parseFloat(e.target.value))} className="filter-range" />
            <div className="range-labels"><span>0</span><span>9+</span></div>
          </div>

          <div className="filter-checks">
            <label className="check-row">
              <input type="checkbox" checked={cctv} onChange={e=>setCctv(e.target.checked)} />
              <span>📹 CCTV Available</span>
            </label>
            <label className="check-row">
              <input type="checkbox" checked={womenStaff} onChange={e=>setWomenStaff(e.target.checked)} />
              <span>👩 Women Staff</span>
            </label>
            <label className="check-row">
              <input type="checkbox" checked={security24} onChange={e=>setSecurity24(e.target.checked)} />
              <span>🛡️ 24/7 Security</span>
            </label>
          </div>

          <div className="view-toggle">
            <button className={`vt-btn ${!mapView?'active':''}`} onClick={()=>setMapView(false)}>🗂️ Grid</button>
            <button className={`vt-btn ${mapView?'active':''}`} onClick={()=>setMapView(true)}>🗺️ Map</button>
          </div>

          <div className="hotels-count">{filtered.length} hotels found</div>
        </div>

        {/* Results */}
        <div className="hotels-results">
          {mapView ? (
            <div className="hotels-map glass">
              <svg viewBox="0 0 100 100" width="100%" height="100%">
                {filtered.map((h,i) => (
                  <g key={h.id} onClick={()=>setSelected(h)} style={{cursor:'pointer'}}>
                    <circle cx={15+i*14} cy={30+i*8} r="4"
                      fill={h.score>=9?'#00c864':h.score>=7?'#ffb400':'#f43f5e'}
                      opacity="0.8"/>
                    <text x={15+i*14} y={30+i*8+0.5} textAnchor="middle" dominantBaseline="middle"
                      fontSize="2.5" fontFamily="Poppins" fill="#fff">
                      {h.img}
                    </text>
                    <text x={15+i*14} y={30+i*8+7} textAnchor="middle" fontSize="2.2" fill="rgba(255,255,255,0.6)" fontFamily="Poppins">
                      {h.score}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          ) : (
            <div className="hotels-grid">
              {filtered.map(h => (
                <div key={h.id} className="hotel-card glass-light">
                  <div className="hotel-img">{h.img}</div>
                  <div className="hotel-info">
                    <div className="hotel-name">{h.name}</div>
                    <div className="hotel-score-row">
                      <span className={`hotel-score ${h.score>=9?'safe':h.score>=7?'moderate':'danger'}`}>
                        ⭐ {h.score}/10
                      </span>
                      <span className="hotel-dist">📍 {h.dist}</span>
                    </div>
                    <div className="hotel-badges">
                      {h.cctv && <span className="hotel-badge">📹 CCTV</span>}
                      {h.staff && <span className="hotel-badge">👩 Women Staff</span>}
                      {h.security && <span className="hotel-badge">🛡️ 24/7</span>}
                    </div>
                    <div className="hotel-reviews">"{h.reviews}"</div>
                    <div className="hotel-price">{h.price}</div>
                    <div className="hotel-actions">
                      <button className="btn-primary" style={{fontSize:'0.78rem',padding:'0.45rem 1rem'}}
                        onClick={()=>setSelected(h)}>View Details</button>
                      <button className="btn-secondary" style={{fontSize:'0.78rem',padding:'0.4rem 0.9rem'}}>Directions</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="hotel-modal-overlay" onClick={()=>setSelected(null)}>
          <div className="hotel-modal glass" onClick={e=>e.stopPropagation()}>
            <button className="modal-close" onClick={()=>setSelected(null)}>✕</button>
            <div className="modal-img">{selected.img}</div>
            <h2>{selected.name}</h2>
            <div className={`hotel-score ${selected.score>=9?'safe':selected.score>=7?'moderate':'danger'}`} style={{fontSize:'1.3rem',margin:'0.5rem 0'}}>
              ⭐ {selected.score}/10
            </div>
            <p style={{color:'var(--text-secondary)',fontSize:'0.9rem',marginBottom:'1rem'}}>{selected.reviews}</p>
            <div className="hotel-badges" style={{marginBottom:'1rem'}}>
              {selected.cctv && <span className="hotel-badge">📹 CCTV</span>}
              {selected.staff && <span className="hotel-badge">👩 Women Staff</span>}
              {selected.security && <span className="hotel-badge">🛡️ 24/7 Security</span>}
            </div>
            <div style={{fontWeight:700,fontSize:'1.2rem',color:'var(--pink-300)',marginBottom:'1rem'}}>{selected.price}</div>
            <div style={{display:'flex',gap:'0.8rem'}}>
              <button className="btn-primary" style={{flex:1}}>Book Now</button>
              <button className="btn-secondary" style={{flex:1}}>Get Directions</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}