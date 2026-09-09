import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Chip,
  LinearProgress,
  Button,
  Grid,
  Stack,
} from '@mui/material';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremiumRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded';
import ReplayIcon from '@mui/icons-material/ReplayRounded';
import AppLayout from '../components/AppLayout';
import { getResult } from '../api/assessmentApi';

const dimensionLabels = {
  R: 'Realistic',
  I: 'Investigative',
  A: 'Artistic',
  S: 'Social',
  E: 'Enterprising',
  C: 'Conventional',
};

function AssessmentResultPage() {
  const { sessionId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const data = await getResult(sessionId);
        setResult(data);
      } catch (err) {
        console.error('Error fetching result:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [sessionId]);

  if (loading) {
    return (
      <AppLayout activeTab="RIASEC Test">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress sx={{ color: '#635BFF' }} />
        </Box>
      </AppLayout>
    );
  }

  if (!result || !result.scores) {
    return (
      <AppLayout activeTab="RIASEC Test">
        <Paper sx={{ p: 5, borderRadius: 6, textAlign: 'center', bgcolor: 'white', maxWidth: 500, mx: 'auto' }}>
          <Typography variant="h6" color="error" gutterBottom>
            Could not load assessment results.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/assessment')}
            sx={{ mt: 2, bgcolor: '#635BFF', borderRadius: 3, fontWeight: 700 }}
          >
            Retake Test
          </Button>
        </Paper>
      </AppLayout>
    );
  }

  const sortedDimensions = Object.entries(result.scores).sort((a, b) => b[1] - a[1]);

  return (
    <AppLayout activeTab="RIASEC Test">
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1A1C24', mb: 1 }}>
            Your RIASEC Holland Profile 🏆
          </Typography>
          <Typography variant="body2" sx={{ color: '#7E8494' }}>
            Analysis of your vocational interests and dominant personality traits.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<ReplayIcon />}
          onClick={() => navigate('/assessment')}
          sx={{
            borderRadius: 3.5,
            borderColor: '#E2E5EE',
            color: '#635BFF',
            fontWeight: 700,
            textTransform: 'none',
            '&:hover': { bgcolor: '#EDEDFE', borderColor: '#635BFF' },
          }}
        >
          Retake Assessment
        </Button>
      </Box>

      {/* Dominant Code Hero Banner */}
      <Paper
        sx={{
          p: { xs: 3, md: 4.5 },
          borderRadius: 6,
          mb: 4,
          bgcolor: '#635BFF',
          color: 'white',
          boxShadow: '0 12px 35px rgba(99, 91, 255, 0.25)',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 3,
        }}
      >
        <Box sx={{ maxWidth: 600 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.5 }}>
            <Chip
              icon={<WorkspacePremiumIcon sx={{ color: '#FFD700 !important' }} />}
              label="DOMINANT PROFILE"
              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 800, letterSpacing: 0.5 }}
            />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
              Primary Holland Code
            </Typography>
          </Stack>

          <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: '-0.02em', mb: 1 }}>
            {result.dominantCode}
          </Typography>

          <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
            Your dominant code indicates strong affinity in{' '}
            <strong>
              {result.dominantCode
                ?.split('')
                .map((letter) => dimensionLabels[letter] || letter)
                .join(', ')}
            </strong>
            . This profile aligns with high analytical focus and technical problem solving.
          </Typography>
        </Box>

        <Box sx={{ minWidth: 220 }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            onClick={() => navigate(`/recommendations/${sessionId}`)}
            sx={{
              bgcolor: 'white',
              color: '#635BFF',
              fontWeight: 800,
              borderRadius: 3.5,
              px: 3.5,
              py: 1.4,
              textTransform: 'none',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
              '&:hover': { bgcolor: '#F4F3FF' },
            }}
          >
            See Career Matches →
          </Button>
        </Box>
      </Paper>

      {/* Dimension Breakdown Grid */}
      <Paper
        sx={{
          p: { xs: 3, md: 4.5 },
          borderRadius: 6,
          bgcolor: 'white',
          border: '1.5px solid #F0F2F7',
          boxShadow: '0 8px 30px rgba(100, 110, 140, 0.04)',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#1A1C24', mb: 3 }}>
          Detailed Dimension Breakdown
        </Typography>

        <Grid container spacing={3}>
          {sortedDimensions.map(([dimension, score], index) => {
            const isTop = index === 0;
            const barColor = isTop ? '#635BFF' : '#00D097';

            return (
              <Grid key={dimension} size={{ xs: 12, md: 6 }}>
                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 4,
                    bgcolor: '#F9FAFD',
                    border: isTop ? '1.5px solid #635BFF' : '1px solid #F0F2F7',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Chip
                        label={dimension}
                        size="small"
                        sx={{
                          bgcolor: isTop ? '#635BFF' : '#EDEDFE',
                          color: isTop ? 'white' : '#635BFF',
                          fontWeight: 800,
                          borderRadius: 2,
                        }}
                      />
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1A1C24' }}>
                        {dimensionLabels[dimension] || dimension}
                      </Typography>
                    </Stack>

                    <Typography variant="body2" sx={{ fontWeight: 800, color: isTop ? '#635BFF' : '#00D097' }}>
                      {score.toFixed(1)}%
                    </Typography>
                  </Box>

                  <LinearProgress
                    variant="determinate"
                    value={score}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: '#EAEFF8',
                      '& .MuiLinearProgress-bar': { bgcolor: barColor },
                    }}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </AppLayout>
  );
}

export default AssessmentResultPage;