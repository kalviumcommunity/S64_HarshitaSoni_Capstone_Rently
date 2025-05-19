import React from 'react';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Home, People, AttachMoney, Build } from '@mui/icons-material';
import Map from '../components/Map';
import './LandingPage.css';

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '70vh',
  background: '#f8f6f3',
  display: 'flex',
  alignItems: 'center',
  paddingTop: '90px',
  paddingBottom: '40px',
}));

const HeroGrid = styled(Grid)(({ theme }) => ({
  maxWidth: 1400,
  margin: '0 auto',
  width: '100%',
  alignItems: 'center',
}));

const HeroText = styled(Box)(({ theme }) => ({
  paddingLeft: '2rem',
  paddingRight: '2rem',
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Playfair Display, serif',
  fontWeight: 700,
  fontSize: '3.5rem',
  marginBottom: '2rem',
  color: '#222',
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '1.1rem',
  color: '#444',
  marginBottom: '2.5rem',
}));

const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '1.5rem',
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: '#222',
  color: '#fff',
  fontWeight: 500,
  fontSize: '1.1rem',
  padding: '1rem 2.5rem',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  '&:hover': {
    background: '#111',
  },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
  background: '#fff',
  color: '#222',
  fontWeight: 500,
  fontSize: '1.1rem',
  padding: '1rem 2.5rem',
  borderRadius: '8px',
  border: '2px solid #222',
  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
  '&:hover': {
    background: '#f5f5f5',
  },
}));

const MapContainer = styled(Box)(({ theme }) => ({
  borderRadius: '18px',
  overflow: 'hidden',
  boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
  width: '100%',
  maxWidth: 500,
  margin: '0 auto',
}));

const FeaturesSection = styled(Box)(({ theme }) => ({
  background: '#f8f6f3',
  padding: '2.5rem 0 2.5rem 0',
}));

const FeaturesGrid = styled(Grid)(({ theme }) => ({
  maxWidth: 1400,
  margin: '0 auto',
  width: '100%',
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  background: '#fff',
  borderRadius: '16px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  padding: '2.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  minHeight: 180,
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  fontSize: '2.5rem',
  color: '#bfa76a',
  marginBottom: '1.5rem',
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Playfair Display, serif',
  fontWeight: 700,
  fontSize: '1.4rem',
  color: '#222',
  marginBottom: '0.7rem',
}));

const FeatureDesc = styled(Typography)(({ theme }) => ({
  color: '#444',
  fontSize: '1rem',
}));

const Footer = styled(Box)(({ theme }) => ({
  background: '#fff',
  borderTop: '1px solid #eee',
  padding: '2.2rem 0 1.2rem 0',
  marginTop: '2rem',
}));

const FooterContent = styled(Box)(({ theme }) => ({
  maxWidth: 1400,
  margin: '0 auto',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '2rem',
  width: '100%',
}));

const FooterSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 600,
  fontSize: '1.1rem',
  color: '#222',
}));

const features = [
  {
    icon: <Home className="feature-icon" />,
    title: 'Property Management',
    desc: 'Easily manage your properties, units, and tenants all in one place.',
  },
  {
    icon: <People className="feature-icon" />,
    title: 'Tenant Portal',
    desc: 'Give tenants access to pay rent, submit maintenance requests, and view lease info.',
  },
  {
    icon: <AttachMoney className="feature-icon" />,
    title: 'Rent Collection',
    desc: 'Secure online rent payments with automatic tracking and reminders.',
  },
  {
    icon: <Build className="feature-icon" />,
    title: 'Maintenance',
    desc: 'Streamline maintenance requests and track their progress.',
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: '#f8f6f3' }}>
      <div className="navbar">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Rently Logo" style={{ height: '54px', width: 'auto' }} />
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/features" className="nav-link">Features</Link>
          <Link to="/faq" className="nav-link">FAQ</Link>
        </div>
      </div>

      <section className="hero-section">
        <div className="hero-content">
          <h1 className="title">Manage Rentals Effortlessly with Rently</h1>
          <p className="subtitle">
            For landlords and tenants—track rent, properties, and payments all in one place.
          </p>
          <div className="button-group">
            <button className="button primary" onClick={() => navigate('/signup')}>Get Started</button>
            <Link to="/login" className="button secondary">Login</Link>
          </div>
        </div>
        <div className="map-container">
          <Map />
        </div>
      </section>

      <section className="features-section">
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              {f.icon}
              <div className="feature-title">{f.title}</div>
              <div className="feature-description">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer>
        <FooterContent>
          <FooterSection>Contact Us</FooterSection>
          <FooterSection>Follow Us</FooterSection>
          <FooterSection>Legal</FooterSection>
        </FooterContent>
      </Footer>
    </Box>
  );
};

export default LandingPage; 