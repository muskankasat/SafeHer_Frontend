import { useState } from 'react';
import './SOSPage.css';

export default function SOSPage() {
  const [activated, setActivated] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const triggerSOS = () => {
    let c = 3;
    setCountdown(c);
    const timer = setInterval(() => {
      c--;
      if (c <= 0) {
        clearInterval(timer);
        setCountdown(null);
        setActivated(true);
      } else {
        setCountdown(c);
      }
    }, 1000);
  };

  if (activated) return (
    <div className="sos-page sos-active">
      <div className="sos-active-banner">
        <div className="sos-pulse-ring" />
        <div className="sos-active-icon">🚨</div>
        <h1>SOS ACTIVATED</h1>
        <p>Help is on the way. Stay calm and stay on the line.</p>
        <div className="sos-actions-taken">
          <div className="sos-action">✅ Live location sent to 3 contacts</div>
          <div className="sos-action">✅ Nearest police station alerted</div>
          <div className="sos-action">✅ Location tracking started</div>
          <div className="sos-action">✅ Recording safety log</div>
        </div>
        <button className="btn-cancel-sos" onClick={()=>setActivated(false)}>
          Cancel SOS (I'm Safe)
        </button>
      </div>
    </div>
  );

  return (
    <div className="sos-page">
      <div className="nav-spacer"/>
      <div className="sos-content">
        <div className="sos-warning-badge">
          <span className="dot-pink"/>EMERGENCY FEATURE — Use Only When Needed
        </div>

        <h1 className="sos-title">SOS Emergency</h1>
        <p className="sos-sub">In case of immediate danger, press and hold the SOS button below.</p>

        {/* Big SOS Button */}
        <div className="sos-btn-wrapper">
          {countdown !== null && (
            <div className="sos-countdown">{countdown}</div>
          )}
          <button
            className={`sos-btn ${countdown!==null?'counting':''}`}
            onClick={countdown===null ? triggerSOS : undefined}
          >
            <span className="sos-btn-label">SOS</span>
            <span className="sos-btn-sub">Press to activate</span>
          </button>
        </div>

        {/* What happens */}
        <div className="sos-info glass">
          <h3>When you press SOS:</h3>
          <div className="sos-steps">
            <div className="sos-step"><span className="step-num">1</span><span>Your live GPS location is shared with your 3 emergency contacts</span></div>
            <div className="sos-step"><span className="step-num">2</span><span>Nearest police station & women helpline are automatically alerted</span></div>
            <div className="sos-step"><span className="step-num">3</span><span>Real-time location tracking is activated for 2 hours</span></div>
            <div className="sos-step"><span className="step-num">4</span><span>A distress message with your location is sent via SMS</span></div>
          </div>
        </div>

        {/* Secondary actions */}
        <div className="sos-secondary">
          <button className="sos-sec-btn call">
            <span className="sec-icon">📞</span>
            <span>Call Emergency</span>
            <span className="sec-num">112</span>
          </button>
          <button className="sos-sec-btn message">
            <span className="sec-icon">💬</span>
            <span>Women Helpline</span>
            <span className="sec-num">1091</span>
          </button>
          <button className="sos-sec-btn distress">
            <span className="sec-icon">📤</span>
            <span>Send Distress Message</span>
            <span className="sec-num">to contacts</span>
          </button>
        </div>
      </div>
    </div>
  );
}