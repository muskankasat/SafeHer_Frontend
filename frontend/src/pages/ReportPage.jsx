import { useState } from 'react';
import './ReportPage.css';

export default function ReportPage() {
  const [form, setForm] = useState({ incidentType:'', location:'', description:'', severity:'medium' });
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState(null);

  const update = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.incidentType && form.location) {
      try {
        const response = await fetch('http://localhost:5000/api/reports', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        });
        if (response.ok) {
          setSubmitted(true);
        } else {
          alert('Failed to submit report. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting report:', error);
        alert('Error submitting report. Please try again.');
      }
    }
  };

  if (submitted) return (
    <div className="report-page">
      <div className="nav-spacer"/>
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'60vh'}}>
        <div className="report-success glass">
          <div className="success-icon">✅</div>
          <h2>Report Submitted!</h2>
          <p>Thank you for making the community safer. Your report has been sent to the safety team and local authorities.</p>
          <div className="success-id">Report ID: <strong>#SH-{Math.floor(Math.random()*90000)+10000}</strong></div>
          <button className="btn-primary" style={{marginTop:'1.5rem'}} onClick={()=>setSubmitted(false)}>
            Submit Another Report
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="report-page">
      <div className="nav-spacer"/>
      <div className="container">
        <div className="report-header">
          <h1>📣 Report a Safety Problem</h1>
          <p>Your report helps protect everyone. All submissions are anonymous.</p>
        </div>

        <div className="report-card glass">
          <form onSubmit={handleSubmit}>
            {/* Incident Type */}
            <div className="form-group">
              <label>Incident Type <span className="required">*</span></label>
              <select className="form-select" value={form.incidentType} onChange={e=>update('incidentType',e.target.value)} required>
                <option value="">Select incident type...</option>
                <option value="harassment">😤 Harassment</option>
                <option value="unsafe">🚧 Unsafe Street/Area</option>
                <option value="suspicious">👁️ Suspicious Activity</option>
                <option value="transport">🚌 Unsafe Transport</option>
                <option value="lighting">💡 Poor Lighting</option>
                <option value="other">📋 Other</option>
              </select>
            </div>

            {/* Location */}
            <div className="form-group">
              <label>Location <span className="required">*</span></label>
              <div className="location-input-row">
                <input
                  className="form-input"
                  placeholder="Enter location or address"
                  value={form.location}
                  onChange={e=>update('location',e.target.value)}
                  required
                />
                <button type="button" className="btn-locate">📍 Use My Location</button>
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-textarea"
                placeholder="Describe what happened in detail..."
                rows={4}
                value={form.description}
                onChange={e=>update('description',e.target.value)}
              />
            </div>

            {/* File Upload */}
            <div className="form-group">
              <label>Evidence (optional)</label>
              <div className="file-upload" onClick={()=>document.getElementById('fileInput').click()}>
                <input id="fileInput" type="file" accept="image/*,video/*" style={{display:'none'}}
                  onChange={e=>setFile(e.target.files[0])} />
                {file ? (
                  <div className="file-selected">
                    <span>📎 {file.name}</span>
                    <button type="button" onClick={e=>{e.stopPropagation();setFile(null);}}>✕</button>
                  </div>
                ) : (
                  <div className="file-placeholder">
                    <span className="file-icon">📤</span>
                    <span>Click to upload image or video</span>
                    <span className="file-hint">Max 50MB · JPG, PNG, MP4</span>
                  </div>
                )}
              </div>
            </div>

            {/* Severity */}
            <div className="form-group">
              <label>Severity Level</label>
              <div className="severity-selector">
                {['low','medium','high'].map(s => (
                  <button key={s} type="button"
                    className={`severity-btn severity-${s} ${form.severity===s?'active':''}`}
                    onClick={()=>update('severity',s)}>
                    {s==='low'&&'🟢'} {s==='medium'&&'🟡'} {s==='high'&&'🔴'}
                    {' '}{s.charAt(0).toUpperCase()+s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{width:'100%',padding:'0.9rem',fontSize:'1rem'}}>
              📣 Submit Report
            </button>

            <p className="form-note">
              🔒 Your identity is protected. Reports are reviewed within 2 hours.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}