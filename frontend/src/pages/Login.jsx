import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './LandingPage.css';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Store user data in localStorage or context if needed
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect based on role
        if (data.user.role === 'tenant') {
          navigate('/discover');
        } else if (data.user.role === 'landlord') {
          navigate('/landlord-dashboard');
        }
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      console.error('Login failed:', error);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  useEffect(() => {
    // Override global body margin and background for this page
    document.body.style.marginTop = '0';
    document.body.style.background = '#F8F9F9';
    return () => {
      document.body.style.marginTop = '';
      document.body.style.background = '';
    };
  }, []);

  return (
    <div style={{ 
      backgroundColor: '#F8F9F9',
      minHeight: '100vh',
      width: '100vw',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Logo at top left */}
      <Link to="/" style={{ position: 'absolute', top: 0, left: 0, zIndex: 10, padding: 16 }}>
        <img src="/logo.png" alt="Rently Logo" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
      </Link>
      {/* Centered Login Box, shifted 2px down */}
      <div style={{ width: '100%', maxWidth: 420, transform: 'translateY(2px)' }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: '20px', backgroundColor: '#fff', width: '100%' }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
            Welcome Back
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ flex: 1, height: 1, background: '#e0e0e0' }} />
            <Typography sx={{ mx: 2, color: '#888', fontSize: 14 }}>or</Typography>
            <Box sx={{ flex: 1, height: 1, background: '#e0e0e0' }} />
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            {error && (
              <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                {error}
              </Typography>
            )}
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2, background: '#f8f9fa', borderRadius: '8px' }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              sx={{ mb: 1, background: '#f8f9fa', borderRadius: '8px' }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <input type="checkbox" id="remember" style={{ marginRight: 6 }} />
                <label htmlFor="remember" style={{ fontSize: 14, color: '#555' }}>Remember me</label>
              </Box>
              <Button
                onClick={handleForgotPassword}
                sx={{ textTransform: 'none', color: '#388e3c', fontSize: '0.95rem', fontWeight: 500, background: 'none', p: 0, minWidth: 0, '&:hover': { textDecoration: 'underline', background: 'none' } }}
              >
                Forgot Password?
              </Button>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.5,
                backgroundColor: '#43a047',
                borderRadius: '8px',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(67,160,71,0.08)',
                '&:hover': { backgroundColor: '#388e3c' },
              }}
            >
              Log In
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2" sx={{ color: '#888' }}>
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: '#43a047', textDecoration: 'none', fontWeight: 600 }}>
                  Sign up now
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </div>
    </div>
  );
};

export default Login; 