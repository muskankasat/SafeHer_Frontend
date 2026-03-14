import './CommunityPage.css';

const FEEDBACK = [
  { user: 'Anjali M.', time: '1h ago', text: 'Saket market area feels much safer now with the new patrol. Great improvement!', rating: 5 },
  { user: 'Preethi K.', time: '3h ago', text: 'Please add more lights near the Lajpat Nagar metro exit. Very dark after 8 PM.', rating: 3 },
  { user: 'Sunita R.', time: '5h ago', text: 'The route safety feature saved me today — avoided a sketchy street I always used to take.', rating: 5 },
  { user: 'Divya T.', time: '8h ago', text: 'Connaught Place is my go-to for safe shopping. Highly recommend this area.', rating: 4 },
  { user: 'Meera P.', time: '1d ago', text: 'Why is Old Delhi still red? Action needed immediately.', rating: 2 },
];

const SAFEST = ['Saket (8.4)', 'Connaught Place (8.1)', 'Dwarka (7.5)', 'Rohini (6.0)', 'Vasant Kunj (7.8)'];
const RISKY = ['Old Delhi (2.9)', 'Paharganj (3.1)', 'Karol Bagh (4.8)', 'Anand Vihar (4.2)', 'Shahdara (4.5)'];

const TRENDS = [
  { label: 'Jan', safe: 62, mod: 25, danger: 13 },
  { label: 'Feb', safe: 65, mod: 23, danger: 12 },
  { label: 'Mar', safe: 68, mod: 22, danger: 10 },
  { label: 'Apr', safe: 64, mod: 24, danger: 12 },
  { label: 'May', safe: 70, mod: 20, danger: 10 },
  { label: 'Jun', safe: 72, mod: 19, danger: 9 },
];

export default function CommunityPage() {
  return (
    <div className="community-page">
      <div className="nav-spacer"/>
      <div className="container">
        <div className="community-header">
          <h1>👥 Community Safety Insights</h1>
          <p>Real data, real voices. See what the community is saying.</p>
        </div>

        <div className="community-grid">
          {/* Safest areas */}
          <div className="comm-card glass">
            <div className="comm-card-title">🟢 Safest Areas</div>
            <div className="areas-list">
              {SAFEST.map((a, i) => (
                <div key={i} className="area-item safe">
                  <span className="area-rank">{i + 1}</span>
                  <span className="area-name">{a}</span>
                  <div className="area-bar" style={{ width: `${85 - i * 8}%`, background: '#00c864' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Most reported */}
          <div className="comm-card glass">
            <div className="comm-card-title">🔴 Most Reported Areas</div>
            <div className="areas-list">
              {RISKY.map((a, i) => (
                <div key={i} className="area-item danger">
                  <span className="area-rank">{i + 1}</span>
                  <span className="area-name">{a}</span>
                  <div className="area-bar" style={{ width: `${90 - i * 12}%`, background: '#f43f5e' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Travel safety trend chart */}
          <div className="comm-card glass comm-wide">
            <div className="comm-card-title">📈 Travel Safety Trends (2025)</div>
            <div className="trend-chart">
              {TRENDS.map((t, i) => (
                <div key={i} className="trend-bar-group">
                  <div className="trend-bars">
                    <div className="trend-bar tb-safe" style={{ height: `${t.safe * 1.4}px` }} title={`Safe: ${t.safe}%`} />
                    <div className="trend-bar tb-mod" style={{ height: `${t.mod * 1.4}px` }} title={`Moderate: ${t.mod}%`} />
                    <div className="trend-bar tb-danger" style={{ height: `${t.danger * 1.4}px` }} title={`Danger: ${t.danger}%`} />
                  </div>
                  <div className="trend-label">{t.label}</div>
                </div>
              ))}
            </div>
            <div className="trend-legend">
              <span><span className="tl-dot safe" />Safe zones</span>
              <span><span className="tl-dot mod" />Moderate</span>
              <span><span className="tl-dot danger" />High Risk</span>
            </div>
          </div>

          {/* Community feedback */}
          <div className="comm-card glass comm-wide">
            <div className="comm-card-title">💬 Women Community Feedback</div>
            <div className="feedback-list">
              {FEEDBACK.map((f, i) => (
                <div key={i} className="feedback-item">
                  <div className="feedback-header">
                    <div className="feedback-avatar">{f.user[0]}</div>
                    <div className="feedback-meta">
                      <div className="feedback-user">{f.user}</div>
                      <div className="feedback-time">{f.time}</div>
                    </div>
                    <div className="feedback-stars">
                      {'★'.repeat(f.rating)}{'☆'.repeat(5 - f.rating)}
                    </div>
                  </div>
                  <p className="feedback-text">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}