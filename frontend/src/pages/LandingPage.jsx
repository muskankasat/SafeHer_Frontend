import './LandingPage.css';

const features = [
  { icon: '🗺️', title: 'Live Heatmap', desc: 'See real-time safety scores and incident overlays for every street in your city.' },
  { icon: '🛡️', title: 'Safe Routing', desc: 'AI-powered navigation that picks the safest path, not just the fastest.' },
  { icon: '🏨', title: 'Trusted Hotels', desc: 'Verified accommodations rated by women, for women — with CCTV and 24/7 security.' },
  { icon: '🚨', title: 'SOS Emergency', desc: 'One tap sends your live location to contacts and local police instantly.' },
  { icon: '📣', title: 'Community Reports', desc: 'Crowdsourced safety data from thousands of women in your area.' },
  { icon: '🔐', title: 'Aadhaar Verified', desc: 'Optional identity verification builds trust across the entire platform.' },
];

export default function LandingPage({ onNavigate }) {
  return (
    <div className="landing">
      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero-inner">
          <div className="landing-badge">
            <span className="dot-pink" />
            Women's Safety Platform · India
          </div>
          <h1 className="landing-title">
            Move Through<br />
            The World<br />
            <span className="landing-title-pink">Without Fear.</span>
          </h1>
          <p className="landing-sub">
            SafeHer combines real-time incident data, AI navigation,
            and community intelligence to keep you safe — every step of the way.
          </p>
          <div className="landing-cta-row">
            <button className="btn-primary landing-cta" onClick={() => onNavigate('auth')}>
              Start Safe Navigation →
            </button>
            <button className="btn-ghost" onClick={() => onNavigate('gov')}>
              Gov Dashboard
            </button>
          </div>
          <p className="landing-hint">No account needed · Sign in with Google to save your data</p>
        </div>

        {/* Floating stat cards
        <div className="landing-stats">
          <div className="stat-card glass">
            <div className="stat-num">2.4M+</div>
            <div className="stat-label">Reports collected</div>
          </div>
          <div className="stat-card glass">
            <div className="stat-num">98%</div>
            <div className="stat-label">Route accuracy</div>
          </div>
          <div className="stat-card glass">
            <div className="stat-num">500+</div>
            <div className="stat-label">Cities covered</div>
          </div>
        </div> */}
      </section>

      {/* About Section */}
      <section className="landing-section container">
        <div className="section-header">
          <div className="badge">About SafeHer</div>
          <h2>Safety intelligence, built around you.</h2>
          <p>SafeHer aggregates reported incidents, government data, and live community feedback to give you a clear, real-time picture of safety around you — so you can move with confidence.</p>
        </div>

        <div className="about-grid">
          <div className="about-card glass-light">
            <div className="about-icon">📍</div>
            <h3>Real-Time Data</h3>
            <p>Heatmaps updated every 15 minutes from verified incident reports and municipal data feeds.</p>
          </div>
          <div className="about-card glass-light">
            <div className="about-icon">🤖</div>
            <h3>AI-Powered Insights</h3>
            <p>Machine learning models predict risk zones and suggest patrol increases before incidents occur.</p>
          </div>
          <div className="about-card glass-light">
            <div className="about-icon">🤝</div>
            <h3>Community-First</h3>
            <p>Every woman who reports makes the platform safer for everyone. Your voice directly shapes the map.</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="landing-section container">
        <div className="section-header">
          <div className="badge">Key Features</div>
          <h2>Everything you need to feel safe.</h2>
        </div>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card glass-light">
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sign In */}
      <section className="landing-signin container">
        <div className="signin-card glass">
          <h2>Ready to navigate safely?</h2>
          <p>Join thousands of women using SafeHer across India.</p>
          <button className="btn-google" onClick={() => onNavigate('auth')}>
            <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
              <path d="M44.5 20H24v8.5h11.8C34.7 33.9 29.9 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 6 1.1 8.2 3l6.4-6.4C34.6 4.6 29.6 2.5 24 2.5 12.4 2.5 3 11.9 3 23.5S12.4 44.5 24 44.5c11 0 20.5-8 20.5-21 0-1.4-.1-2.7-.5-4z" fill="#FFC107"/>
              <path d="M6.3 14.7l7 5.1C15.1 16 19.2 13 24 13c3.1 0 6 1.1 8.2 3l6.4-6.4C34.6 4.6 29.6 2.5 24 2.5c-7.8 0-14.5 4.4-17.7 10.2z" fill="#FF3D00"/>
              <path d="M24 44.5c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.6C29.6 35.8 27 36.5 24 36.5c-5.9 0-10.8-3.5-12.1-8.5l-7 5.4C7.6 40.1 15.2 44.5 24 44.5z" fill="#4CAF50"/>
              <path d="M44.5 20H24v8.5h11.8c-.6 2.6-2.1 4.8-4.3 6.4l6.6 5.6C42 37.2 44.5 31 44.5 24c0-1.4-.1-2.7-.5-4z" fill="#1976D2"/>
            </svg>
            Continue with Google
          </button>
          <div className="aadhaar-note">
            <span>🔐</span>
            <span><strong>Optional:</strong> Link your Aadhaar for a verified badge. This increases trust and unlocks community features. Your data is encrypted and never shared.</span>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <span>© 2025 SafeHer · Built for Women</span>
        <span style={{ color: 'var(--pink-400)' }}>♥ Made with care</span>
      </footer>
    </div>
  );
}