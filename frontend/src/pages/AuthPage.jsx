import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import './AuthPage.css';

export default function AuthPage({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('options'); // options | verified

  const handleGoogleSuccess = async (tokenResponse) => {
    console.log('Google Login Success:', tokenResponse);
    try {
      const res = await axios.post('http://localhost:5000/api/users/google-login', {
        access_token: tokenResponse.access_token
      });
      console.log('User saved:', res.data);
      setStep('verified');
    } catch (error) {
      console.error('Failed to save Google user:', error);
      alert('Failed to authenticate with Google. Please try again.');
    }
  };

  const handleGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => console.log('Google Login Failed'),
  });

  const handleEmail = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/users/verify-email",
          { email }
        );
        alert("Email stored successfully");
        console.log(res.data);
        setStep('verified');
      } catch (error) {
        console.error(error);
        alert("Failed to verify email. Please try again.");
      }
    }
  };
  const handleAadhaar = () => setStep('verified');

  if (step === 'verified') {
    return (
      <div className="auth-page">
        <div className="auth-card glass">
          <div className="auth-success-icon">✅</div>
          <h2>Verification Complete!</h2>
          <p>Your SafeHer profile has been created. You're all set.</p>
          <div className="auth-badges">
            <span className="badge">Identity Verified</span>
            <span className="badge">Profile Active</span>
          </div>
          <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} onClick={() => onNavigate('home')}>
            Enter SafeHer →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card glass">
        <div className="auth-logo">
          <span className="auth-logo-text">Safe<span>Her</span></span>
        </div>
        <h2>Verify Your Identity</h2>
        <p className="auth-sub">Choose a verification method to get started securely.</p>

        {/* Flow Indicator */}
        <div className="auth-flow">
          <div className="flow-step active"><span>1</span> Verify</div>
          <div className="flow-line" />
          <div className="flow-step"><span>2</span> Profile</div>
          <div className="flow-line" />
          <div className="flow-step"><span>3</span> Explore</div>
        </div>

        {/* Google */}
        <button className="btn-google-auth" onClick={handleGoogle}>
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none">
            <path d="M44.5 20H24v8.5h11.8C34.7 33.9 29.9 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 6 1.1 8.2 3l6.4-6.4C34.6 4.6 29.6 2.5 24 2.5 12.4 2.5 3 11.9 3 23.5S12.4 44.5 24 44.5c11 0 20.5-8 20.5-21 0-1.4-.1-2.7-.5-4z" fill="#FFC107"/>
            <path d="M6.3 14.7l7 5.1C15.1 16 19.2 13 24 13c3.1 0 6 1.1 8.2 3l6.4-6.4C34.6 4.6 29.6 2.5 24 2.5c-7.8 0-14.5 4.4-17.7 10.2z" fill="#FF3D00"/>
            <path d="M24 44.5c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.6C29.6 35.8 27 36.5 24 36.5c-5.9 0-10.8-3.5-12.1-8.5l-7 5.4C7.6 40.1 15.2 44.5 24 44.5z" fill="#4CAF50"/>
            <path d="M44.5 20H24v8.5h11.8c-.6 2.6-2.1 4.8-4.3 6.4l6.6 5.6C42 37.2 44.5 31 44.5 24c0-1.4-.1-2.7-.5-4z" fill="#1976D2"/>
          </svg>
          Continue with Google
        </button>

        <div className="auth-divider"><span>or</span></div>

        {/* Email */}
        <form className="auth-email-form" onSubmit={handleEmail}>
          <input
            type="email"
            className="auth-input"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            Verify via Email
          </button>
        </form>

        <div className="auth-divider"><span>or</span></div>

        {/* Aadhaar */}
        <button className="btn-aadhaar" onClick={handleAadhaar}>
          🔐 Verify with Aadhaar (Optional)
        </button>
        <p className="auth-aadhaar-note">Aadhaar verification unlocks the verified badge and community trust features. Completely optional.</p>

        <button className="auth-skip" onClick={() => onNavigate('home')}>
          Skip for now →
        </button>
      </div>
    </div>
  );
}