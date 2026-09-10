import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { login } from '../api/authApi';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(email, password);

      const token = data.token || data.loginToken;
      localStorage.setItem('token', token);

      
      localStorage.setItem('email', data.email || email);
      if (data.fullName) {
        localStorage.setItem('fullName', data.fullName);
      }
      if (data.role) {
        localStorage.setItem('role', data.role);
      }

      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#F5F6FA',
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3.5, sm: 4.5 },
          width: '100%',
          maxWidth: 400,
          borderRadius: 6,
          bgcolor: 'white',
          border: '1.5px solid #F0F2F7',
          boxShadow: '0 12px 35px rgba(100, 110, 140, 0.05)',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              bgcolor: '#635BFF',
              borderRadius: 3.5,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 900,
              fontSize: '1.3rem',
              mb: 1.5,
              boxShadow: '0 6px 18px rgba(99, 91, 255, 0.3)',
            }}
          >
            O+
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#1A1C24' }}>
            Login to ORIENTA+
          </Typography>
          <Typography variant="body2" sx={{ color: '#7E8494', mt: 0.5 }}>
            Welcome back! Please enter your details.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2.5,
              py: 1.2,
              borderRadius: 3,
              bgcolor: '#635BFF',
              fontWeight: 700,
              textTransform: 'none',
              boxShadow: '0 8px 20px rgba(99, 91, 255, 0.25)',
              '&:hover': {
                bgcolor: '#534BE8',
              },
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: '#7E8494' }}>
          Don't have an account?{' '}
          <Link
            to="/register"
            style={{ color: '#635BFF', fontWeight: 700, textDecoration: 'none' }}
          >
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default LoginPage;