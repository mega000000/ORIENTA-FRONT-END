import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Paper, Alert, MenuItem } from '@mui/material';
import { submitOnboarding } from '../api/onboardingApi';

function OnboardingPage() {
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
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" mb={1}>Tell us about yourself</Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          This helps us personalize your experience.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Study Level"
            fullWidth
            margin="normal"
            value={studyLevel}
            onChange={(e) => setStudyLevel(e.target.value)}
            required
          >
            <MenuItem value="HIGH_SCHOOL">High School</MenuItem>
            <MenuItem value="BACHELOR">Bachelor</MenuItem>
            <MenuItem value="ENGINEERING">Engineering Student</MenuItem>
            <MenuItem value="MASTER">Master</MenuItem>
          </TextField>

          <TextField
            label="Weekly Available Hours"
            type="number"
            fullWidth
            margin="normal"
            value={weeklyAvailableHours}
            onChange={(e) => setWeeklyAvailableHours(e.target.value)}
            required
          />

          <TextField
            label="Your Objective"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            placeholder="e.g. Become a full-stack developer"
            required
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Continue
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default OnboardingPage;