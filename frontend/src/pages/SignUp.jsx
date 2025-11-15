import React, { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Box, Typography, Container, TextField, Button } from '@mui/material';
import { FaUser, FaHome, FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';
import './LandingPage.css';

function SignUp() {
  const navigate = useNavigate();
  const { role } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: role || 'tenant' // Default to tenant if no role specified
  });
  const [error, setError] = useState('');

  // Update role when URL param changes
  React.useEffect(() => {
    if (role) {
      setFormData(prev => ({
        ...prev,
        role: role
      }));
    }
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      console.log('Signing up with:', formData);
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }),
      });
      const data = await response.json();
      console.log('Signup response:', data);
      if (response.ok) {
        // Defensive: check if user object exists
        if (!data.user) {
          setError('Signup succeeded but no user data returned.');
          alert('Signup succeeded but no user data returned.');
          return;
        }
        localStorage.setItem('user', JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          ...data.user
        }));
        
        // Store the token if provided
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        // Redirect based on role
        if (formData.role === 'landlord') {
          navigate('/landlord-dashboard', { replace: true });
        } else {
          navigate('/discover', { replace: true });
        }
      } else {
        setError(data.message || 'Signup failed. Please try again.');
        alert(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An error occurred during signup. Please try again.');
      alert('An error occurred during signup. Please try again.');
    }
  };

  const handleUserTypeSelect = (type) => {
    setFormData(prev => ({
      ...prev,
      role: type
    }));
    navigate(`/signup/${type}`);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const passwordsMatch = formData.password && formData.confirmPassword && 
                        formData.password === formData.confirmPassword;

  const renderRegistrationForm = () => (
    <Box sx={{
      width: '100%',
      maxWidth: '600px',
      backgroundColor: '#F8F9F9', // Bianco Puro
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      p: 4
    }}>
      <Typography 
        variant="h1" 
        align="center"
        sx={{ 
          fontFamily: 'Georgia, serif',
          fontSize: '2rem',
          fontWeight: '600',
          color: '#1C1C1C', // Nero Elegante
          mb: 4
        }}
      >
        Create Your Account
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          fullWidth
          id="name"
          label="Full Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={formData.name}
          onChange={handleChange}
          sx={{ 
            mb: 2,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#F8F9F9',
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#AAB2B3' // Grigio Fumo
              },
              '&:hover fieldset': {
                borderColor: '#7B8D42' // Verde Oliva
              },
              '&.Mui-focused fieldset': {
                borderColor: '#D4AF37' // Oro Antico
              }
            },
            '& .MuiInputLabel-root': {
              color: '#1C1C1C' // Nero Elegante
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#D4AF37' // Oro Antico
            }
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ 
            mb: 2,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#F8F9F9',
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#AAB2B3' // Grigio Fumo
              },
              '&:hover fieldset': {
                borderColor: '#7B8D42' // Verde Oliva
              },
              '&.Mui-focused fieldset': {
                borderColor: '#D4AF37' // Oro Antico
              }
            },
            '& .MuiInputLabel-root': {
              color: '#1C1C1C' // Nero Elegante
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#D4AF37' // Oro Antico
            }
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          sx={{ 
            mb: 2,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#F8F9F9',
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#AAB2B3' // Grigio Fumo
              },
              '&:hover fieldset': {
                borderColor: '#7B8D42' // Verde Oliva
              },
              '&.Mui-focused fieldset': {
                borderColor: '#D4AF37' // Oro Antico
              }
            },
            '& .MuiInputLabel-root': {
              color: '#1C1C1C' // Nero Elegante
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#D4AF37' // Oro Antico
            }
          }}
        />
        <TextField
          margin="normal"
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          sx={{ 
            mb: 3,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#F8F9F9',
              borderRadius: '8px',
              '& fieldset': {
                borderColor: '#AAB2B3' // Grigio Fumo
              },
              '&:hover fieldset': {
                borderColor: '#7B8D42' // Verde Oliva
              },
              '&.Mui-focused fieldset': {
                borderColor: '#D4AF37' // Oro Antico
              }
            },
            '& .MuiInputLabel-root': {
              color: '#1C1C1C' // Nero Elegante
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#D4AF37' // Oro Antico
            }
          }}
          InputProps={{
            endAdornment: (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {formData.confirmPassword && (
                  <Box sx={{ ml: 0.5 }}>
                    {passwordsMatch ? (
                      <FaCheck style={{ color: '#7B8D42' }} /> // Verde Oliva for success
                    ) : (
                      <FaTimes style={{ color: '#C0392B' }} /> // Rosso Milano for error
                    )}
                  </Box>
                )}
              </Box>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!passwordsMatch}
          sx={{ 
            py: 1.5, 
            backgroundColor: '#C0392B', // Rosso Milano
            borderRadius: '8px',
            textTransform: 'none',
            fontSize: '1rem',
            '&:hover': {
              backgroundColor: '#D4AF37' // Oro Antico
            },
            '&.Mui-disabled': {
              backgroundColor: '#AAB2B3', // Grigio Fumo
              color: '#F8F9F9' // Bianco Puro
            }
          }}
        >
          Create Account
        </Button>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2" sx={{ color: '#AAB2B3' }}> {/* Grigio Fumo */}
            Already have an account?{' '}
            <Link to="/login" style={{ 
              color: '#C0392B', // Rosso Milano
              textDecoration: 'none', 
              fontWeight: 500,
              transition: 'color 0.3s ease',
              '&:hover': {
                color: '#D4AF37' // Oro Antico
              }
            }}>
              Log In
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  const renderRoleSelection = () => (
    <Box sx={{
      width: '100%',
      maxWidth: '600px',
      backgroundColor: '#F8F9F9', // Bianco Puro
      borderRadius: '12px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      p: 4
    }}>
      <Typography 
        variant="h1" 
        align="center"
        sx={{ 
          fontFamily: 'Georgia, serif',
          fontSize: '2rem',
          fontWeight: '600',
          color: '#1C1C1C', // Nero Elegante
          mb: 4
        }}
      >
        Sign Up As
      </Typography>
      
      <Box sx={{ 
        display: 'flex', 
        gap: '20px',
        justifyContent: 'center'
      }}>
        {/* Landlord Card */}
        <Box
          onClick={() => handleUserTypeSelect('landlord')}
          sx={{
            width: '220px',
            p: '24px',
            cursor: 'pointer',
            border: '1px solid #AAB2B3', // Grigio Fumo
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#F8F9F9', // Bianco Puro
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderColor: '#D4AF37', // Oro Antico
              '& svg': {
                color: '#C0392B' // Rosso Milano
              }
            }
          }}
        >
          <FaUser style={{ 
            fontSize: '24px', 
            marginBottom: '12px',
            color: '#1C1C1C', // Nero Elegante
            transition: 'color 0.3s ease'
          }} />
          <Typography 
            sx={{ 
              fontFamily: 'Georgia, serif',
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#1C1C1C', // Nero Elegante
              mb: 1
            }}
          >
            Landlord
          </Typography>
          <Typography 
            align="center"
            sx={{ 
              color: '#AAB2B3', // Grigio Fumo
              fontSize: '0.875rem',
              lineHeight: 1.5
            }}
          >
            List and manage your properties
          </Typography>
        </Box>

        {/* Tenant Card */}
        <Box
          onClick={() => handleUserTypeSelect('tenant')}
          sx={{
            width: '220px',
            p: '24px',
            cursor: 'pointer',
            border: '1px solid #AAB2B3', // Grigio Fumo
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#F8F9F9', // Bianco Puro
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderColor: '#D4AF37', // Oro Antico
              '& svg': {
                color: '#C0392B' // Rosso Milano
              }
            }
          }}
        >
          <FaHome style={{ 
            fontSize: '24px', 
            marginBottom: '12px',
            color: '#1C1C1C', // Nero Elegante
            transition: 'color 0.3s ease'
          }} />
          <Typography 
            sx={{ 
              fontFamily: 'Georgia, serif',
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#1C1C1C', // Nero Elegante
              mb: 1
            }}
          >
            Tenant
          </Typography>
          <Typography 
            align="center"
            sx={{ 
              color: '#AAB2B3', // Grigio Fumo
              fontSize: '0.875rem',
              lineHeight: 1.5
            }}
          >
            Find and rent properties
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <div style={{ 
      backgroundColor: '#F8F9F9', // Bianco Puro
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Logo at top left */}
      <Link to="/" style={{ position: 'absolute', top: 24, left: 32, zIndex: 10 }}>
        <img src="/logo.png" alt="Rently Logo" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
      </Link>
      {/* Main Content */}
      <Container maxWidth="sm" sx={{ 
        mt: 15,
        mb: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {role ? renderRegistrationForm() : renderRoleSelection()}
      </Container>
    </div>
  );
}

export default SignUp; 