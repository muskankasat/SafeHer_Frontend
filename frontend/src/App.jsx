import { useState } from 'react';
import './App.css';

// Background + Nav
import Iridescence from './components/Iridescence.jsx';
import CardNav from './components/CardNav.jsx';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import HeatmapPage from './pages/HeatmapPage';
import NavigatePage from './pages/NavigatePage';
import HotelsPage from './pages/HotelsPage';
import CabPage from './pages/CabPage';
import ReportPage from './pages/ReportPage';
import SOSPage from './pages/SOSPage';
import VoiceGuidePage from './pages/VoiceGuidePage';
import ProfilePage from './pages/ProfilePage';
import GovDashboard from './pages/GovDashboard';
import CommunityPage from './pages/CommunityPage';

const NAV_ITEMS = [
  {
    label: 'Explore',
    bgColor: '#1a0d26',
    textColor: '#fff',
    links: [
      { label: 'Home', ariaLabel: 'Go to Home', onClick: 'home' },
      { label: 'Heatmap', ariaLabel: 'Go to Heatmap', onClick: 'heatmap' },
      { label: 'Navigate', ariaLabel: 'Go to Navigation', onClick: 'navigate' },
    ],
  },
  {
    label: 'Safety',
    bgColor: '#2a0d1a',
    textColor: '#fff',
    links: [
      { label: 'Hotels', ariaLabel: 'Find Safe Hotels', onClick: 'hotels' },
      { label: 'Report', ariaLabel: 'Report a Problem', onClick: 'report' },
      { label: 'Book Cab', ariaLabel: 'Book Safe Cab', onClick: 'cab' },
    ],
  },
  {
    label: 'You',
    bgColor: '#1a0d1f',
    textColor: '#fff',
    links: [
      { label: 'SOS', ariaLabel: 'SOS Emergency', onClick: 'sos' },
      { label: 'Profile', ariaLabel: 'Your Profile', onClick: 'profile' },
      { label: 'Community', ariaLabel: 'Community Insights', onClick: 'community' },
    ],
  },
];

export default function App() {
  const [page, setPage] = useState('landing');

  const navigate = (to) => setPage(to);

  // Build nav items with onClick handlers
  const navItems = NAV_ITEMS.map((section) => ({
    ...section,
    links: section.links.map((link) => ({
      ...link,
      href: '#',
      onClick: (e) => { e.preventDefault(); navigate(link.onClick); },
    })),
  }));

  const isLanding = page === 'landing';
  const isAuth = page === 'auth';
  const isGov = page === 'gov';
  const showCardNav = !isLanding && !isAuth && !isGov;

  const renderPage = () => {
    switch (page) {
      case 'landing':   return <LandingPage onNavigate={navigate} />;
      case 'auth':      return <AuthPage onNavigate={navigate} />;
      case 'home':      return <HomePage onNavigate={navigate} />;
      case 'heatmap':   return <HeatmapPage />;
      case 'navigate':  return <NavigatePage />;
      case 'hotels':    return <HotelsPage />;
      case 'cab':       return <CabPage />;
      case 'report':    return <ReportPage />;
      case 'sos':       return <SOSPage />;
      case 'voice':     return <VoiceGuidePage />;
      case 'profile':   return <ProfilePage onNavigate={navigate} />;
      case 'gov':       return <GovDashboard onNavigate={navigate} />;
      case 'community': return <CommunityPage />;
      default:          return <LandingPage onNavigate={navigate} />;
    }
  };

  return (
    <>
      {/* Iridescence background — always on for user pages */}
      {!isGov && (
        <div className="iridescence-bg">
          <Iridescence color={[0.9, 0.3, 0.4]} mouseReact amplitude={0.1} speed={1} />
        </div>
      )}

      {/* CardNav — shown on all pages except landing/auth/gov */}
      {showCardNav && (
        <CardNav
          logo={null}
          logoAlt="SafeHer"
          items={navItems}
          baseColor="rgba(242, 238, 239, 0.88)"
          menuColor="#ff4d94"
          buttonBgColor="#e91e8c"
          buttonTextColor="#fff"
          ease="power3.out"
          customLogo={
            <span style={{ fontFamily:'Poppins', fontWeight:800, fontSize:'1.15rem', color:'#ff4d94', letterSpacing:'-0.02em' }}>
              Safe<span style={{ color:'#fff' }}>Her</span>
            </span>
          }
        />
      )}

      <div className="page-wrapper">
        {renderPage()}
      </div>
    </>
  );
}