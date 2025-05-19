import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import Layout from '../components/Layout';

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement password reset logic here
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Layout>
        <Container maxWidth="sm">
          <Box sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: '16px' }}>
              <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                Check Your Email
              </Typography>
              <Typography variant="body1" align="center" sx={{ mt: 2, mb: 4 }}>
                We've sent password reset instructions to:<br />
                <strong>{email}</strong>
              </Typography>
              <Button
                fullWidth
                variant="contained"
                onClick={() => navigate('/login')}
                sx={{ 
                  mt: 2,
                  py: 1.5, 
                  backgroundColor: '#1a1a1a',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#333'
                  }
                }}
              >
                Return to Login
              </Button>
            </Paper>
          </Box>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: '16px' }}>
            <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
              Forgot Password
            </Typography>
            <Typography variant="body1" align="center" sx={{ mt: 2, mb: 4 }}>
              Enter your email address and we'll send you instructions to reset your password.
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px' }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2, 
                  py: 1.5, 
                  backgroundColor: '#1a1a1a',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#333'
                  }
                }}
              >
                Send Reset Instructions
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  onClick={() => navigate('/login')}
                  sx={{
                    textTransform: 'none',
                    color: '#1a1a1a',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Back to Login
                </Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Layout>
  );
}

export default ForgotPassword; 