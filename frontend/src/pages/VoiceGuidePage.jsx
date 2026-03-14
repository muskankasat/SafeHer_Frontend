import { useState } from 'react';
import './VoiceGuidePage.css';

const SAMPLE_ALERTS = [
  { icon: '🟡', text: 'Entering moderate safety area. Stay alert.', type: 'moderate' },
  { icon: '🔴', text: 'Warning: High-risk zone ahead. Consider alternate route.', type: 'danger' },
  { icon: '🟢', text: 'You are now in a safe zone. Police station 200m ahead.', type: 'safe' },
  { icon: '🚔', text: 'Police station on your right.', type: 'info' },
  { icon: '☕', text: 'Safe rest stop 100 meters ahead.', type: 'info' },
  { icon: '📍', text: 'Route safety score updated: 7.8 out of 10.', type: 'info' },
  { icon: '🚨', text: 'Incident reported 500m ahead. Rerouting for safety.', type: 'danger' },
];

const LANGUAGES = ['English', 'Hindi', 'Tamil', 'Bengali', 'Telugu', 'Marathi', 'Punjabi'];

export default function VoiceGuidePage() {
  const [enabled, setEnabled] = useState(true);
  const [lang, setLang] = useState('English');
  const [volume, setVolume] = useState(80);
  const [speed, setSpeed] = useState('Normal');
  const [playing, setPlaying] = useState(null);

  const playAlert = (i) => {
    setPlaying(i);
    setTimeout(() => setPlaying(null), 2500);
  };

  return (
    <div className="voice-page">
      <div className="nav-spacer"/>
      <div className="container">
        <div className="voice-header">
          <h1>🔊 AI Voice Guide</h1>
          <p>Real-time audio safety alerts as you navigate.</p>
        </div>

        <div className="voice-grid">
          {/* Settings card */}
          <div className="voice-settings glass">
            <div className="voice-main-toggle">
              <div>
                <div className="vmt-label">Voice Guide</div>
                <div className="vmt-status">{enabled ? '🟢 Active' : '🔴 Disabled'}</div>
              </div>
              <label className="toggle-switch big">
                <input type="checkbox" checked={enabled} onChange={e => setEnabled(e.target.checked)} />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className={`voice-settings-body ${!enabled ? 'disabled' : ''}`}>
              <div className="setting-group">
                <label>Language</label>
                <select className="form-select" value={lang} onChange={e => setLang(e.target.value)} disabled={!enabled}>
                  {LANGUAGES.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>

              <div className="setting-group">
                <label>Volume: {volume}%</label>
                <input type="range" min="0" max="100" value={volume}
                  onChange={e => setVolume(Number(e.target.value))}
                  className="filter-range" disabled={!enabled} />
              </div>

              <div className="setting-group">
                <label>Speech Speed</label>
                <div className="speed-tabs">
                  {['Slow', 'Normal', 'Fast'].map(s => (
                    <button key={s}
                      className={`speed-tab ${speed === s ? 'active' : ''}`}
                      onClick={() => setSpeed(s)}
                      disabled={!enabled}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="setting-group">
                <label>Alert Triggers</label>
                <div className="trigger-checks">
                  {['Zone changes', 'Red zone warnings', 'Police nearby', 'Safe stops', 'Rerouting'].map(t => (
                    <label key={t} className="check-row">
                      <input type="checkbox" defaultChecked disabled={!enabled} />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sample alerts */}
          <div className="voice-alerts glass">
            <h3>Sample Audio Alerts</h3>
            <p className="alerts-sub">Tap any alert to preview how it sounds.</p>
            <div className="alert-samples">
              {SAMPLE_ALERTS.map((a, i) => (
                <div key={i} className={`alert-sample alert-sample-${a.type} ${playing === i ? 'playing' : ''}`}
                  onClick={() => playAlert(i)}>
                  <span className="as-icon">{a.icon}</span>
                  <span className="as-text">{a.text}</span>
                  <span className="as-play">{playing === i ? '🔊' : '▶'}</span>
                </div>
              ))}
            </div>

            {enabled && (
              <div className="voice-active-info">
                <span className="dot-pink"/>
                Voice guide active · {lang} · {volume}% volume · {speed} speed
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}