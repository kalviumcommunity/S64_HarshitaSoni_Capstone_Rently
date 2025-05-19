import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  
  const handleLogin = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      if (response.success) {
        // Assuming the response includes a user role
        const userRole = response.user.role;
        
        // Redirect based on role
        if (userRole === 'tenant') {
          navigate('/tenant-dashboard');
        } else if (userRole === 'landlord') {
          navigate('/landlord-dashboard');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // ... rest of the component code ...
}

export default Login; 