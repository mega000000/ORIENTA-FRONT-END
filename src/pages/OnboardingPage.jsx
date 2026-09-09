import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Alert, MenuItem } from '@mui/material';
import { submitOnboarding } from '../api/onboardingApi';

function OnboardingPage() {
  // Logic untouched
  const [studyLevel, setStudyLevel] = useState('');
  const [weeklyAvailableHours, setWeeklyAvailableHours] = useState('');
  const [objective, setObjective] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await submitOnboarding(studyLevel, Number(weeklyAvailableHours), objective);
      navigate('/dashboard');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',
        bgcolor: '#FBFBFE',
        // Dot Matrix Background
        backgroundImage: 'radial-gradient(#E2E5EE 1.3px, transparent 1.3px)',
        backgroundSize: '24px 24px',
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 4, md: 5 },
          width: '100%',
          maxWidth: 460,
          borderRadius: 4.5,
          bgcolor: 'white',
          border: '1.5px solid #F0F2F7',
          boxShadow: '0 12px 40px rgba(100, 110, 140, 0.08)',
        }}
      >
        {/* Header / Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 3.5,
              bgcolor: '#635BFF',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1.2rem',
              boxShadow: '0 8px 20px rgba(99, 91, 255, 0.25)',
              flexShrink: 0,
            }}
          >
            O+
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1A1C24', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
              Welcome aboard!
            </Typography>
            <Typography variant="body2" sx={{ color: '#7E8494', fontWeight: 500, mt: 0.5 }}>
              Let's personalize your orientation path.
            </Typography>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2.5, fontWeight: 600 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* Study Level */}
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, color: '#4A5060', mb: 0.8, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            Study Level
          </Typography>
          <TextField
            select
            fullWidth
            value={studyLevel}
            onChange={(e) => setStudyLevel(e.target.value)}
            required
            sx={{
              mb: 2.5,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: '#FAFBFD',
                fontWeight: 600,
                '& fieldset': { borderColor: '#EAECEF' },
                '&:hover fieldset': { borderColor: '#635BFF' },
                '&.Mui-focused fieldset': { borderColor: '#635BFF' },
              },
            }}
          >
            <MenuItem value="HIGH_SCHOOL" sx={{ fontWeight: 600 }}>High School</MenuItem>
            <MenuItem value="BACHELOR" sx={{ fontWeight: 600 }}>Bachelor</MenuItem>
            <MenuItem value="ENGINEERING" sx={{ fontWeight: 600 }}>Engineering Student</MenuItem>
            <MenuItem value="MASTER" sx={{ fontWeight: 600 }}>Master</MenuItem>
          </TextField>

          {/* Weekly Hours */}
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, color: '#4A5060', mb: 0.8, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            Weekly Available Hours
          </Typography>
          <TextField
            type="number"
            fullWidth
            placeholder="e.g. 15"
            value={weeklyAvailableHours}
            onChange={(e) => setWeeklyAvailableHours(e.target.value)}
            required
            sx={{
              mb: 2.5,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: '#FAFBFD',
                fontWeight: 600,
                '& fieldset': { borderColor: '#EAECEF' },
                '&:hover fieldset': { borderColor: '#635BFF' },
                '&.Mui-focused fieldset': { borderColor: '#635BFF' },
              },
            }}
          />

          {/* Career Objective */}
          <Typography sx={{ fontSize: '0.75rem', fontWeight: 800, color: '#4A5060', mb: 0.8, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            Primary Career Objective
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="e.g. Become a full-stack developer"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            required
            sx={{
              mb: 3.5,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: '#FAFBFD',
                fontWeight: 600,
                '& fieldset': { borderColor: '#EAECEF' },
                '&:hover fieldset': { borderColor: '#635BFF' },
                '&.Mui-focused fieldset': { borderColor: '#635BFF' },
              },
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              py: 1.4,
              bgcolor: '#635BFF',
              borderRadius: 3,
              fontWeight: 800,
              fontSize: '0.9rem',
              textTransform: 'none',
              boxShadow: '0 8px 24px rgba(99, 91, 255, 0.25)',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: '#534BE8',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 28px rgba(99, 91, 255, 0.35)',
              },
            }}
          >
            Complete Setup
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default OnboardingPage;