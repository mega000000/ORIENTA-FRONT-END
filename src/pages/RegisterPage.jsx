import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Alert, MenuItem } from '@mui/material';
import { register, login } from '../api/authApi';

function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(fullName, email, password, role);
      const loginData = await login(email, password);

      
      const token = loginData.token || loginData.loginToken;
      localStorage.setItem('token', token);
      localStorage.setItem('fullName', loginData.fullName || fullName);
      localStorage.setItem('email', loginData.email || email);
      localStorage.setItem('role', loginData.role || role);

      navigate('/onboarding');
    } catch (err) {
      setError('Registration failed. Please check your information.');
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
          maxWidth: 420,
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
            Create Account
          </Typography>
          <Typography variant="body2" sx={{ color: '#7E8494', mt: 0.5 }}>
            Join ORIENTA+ to find your ideal career path.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2.5, borderRadius: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />
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
          <TextField
            select
            label="Role"
            fullWidth
            margin="normal"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          >
            <MenuItem value="STUDENT">Student</MenuItem>
          </TextField>

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
            {loading ? 'Creating account...' : 'Register'}
          </Button>
        </form>

        <Typography variant="body2" sx={{ textAlign: 'center', mt: 3, color: '#7E8494' }}>
          Already have an account?{' '}
          <Link
            to="/login"
            style={{ color: '#635BFF', fontWeight: 700, textDecoration: 'none' }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default RegisterPage;