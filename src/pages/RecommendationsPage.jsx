import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Button,
  Chip,
  LinearProgress,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded';
import ReplayIcon from '@mui/icons-material/ReplayRounded';
import AppLayout from '../components/AppLayout';
import {
  DoodleRecommend,
  DoodleTrophy,
  DoodleQuiz,
} from '../components/DoodleIcons';
import { generateRecommendations, getLatestRecommendations } from '../api/recommendationApi';

function RecommendationsPage() {
  const { sessionId } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        let data;
        if (sessionId && sessionId !== 'undefined') {
          data = await generateRecommendations(sessionId);
        } else {
          data = await getLatestRecommendations();
        }
        setRecommendations(data || []);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [sessionId]);

  if (loading) {
    return (
      <AppLayout activeTab="Recommendations">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress sx={{ color: '#635BFF' }} />
        </Box>
      </AppLayout>
    );
  }

  // إزالة التكرار واختيار أفضل 3 مسارات
  const top3Recommendations = recommendations
    .filter(
      (rec, index, self) =>
        index ===
        self.findIndex(
          (r) => (r.specialtyId || r.specialtyName) === (rec.specialtyId || rec.specialtyName)
        )
    )
    .slice(0, 3);

  const topMatch = top3Recommendations[0];

  return (
    <AppLayout activeTab="Recommendations">
      {/* Modern Clean Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        <Box>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 1.6,
              py: 0.6,
              bgcolor: '#EDEDFE',
              borderRadius: 5,
              mb: 1.5,
            }}
          >
            <DoodleRecommend sx={{ fontSize: 18, color: '#635BFF' }} />
            <Typography variant="caption" sx={{ color: '#635BFF', fontWeight: 800, letterSpacing: 0.5 }}>
              AI MATCH ENGINE
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.3,
              color: '#1A1C24',
              fontSize: { xs: '1.75rem', md: '2.2rem' },
            }}
          >
            Career{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(90deg, #635BFF 0%, #8F85FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Recommendations
            </Box>
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: '#7E8494',
              mt: 1,
              fontSize: '0.95rem',
              maxWidth: 580,
              lineHeight: 1.6,
            }}
          >
            Personalized matches generated from your RIASEC evaluation scores.
          </Typography>
        </Box>

        <Button
          variant="outlined"
          startIcon={<ReplayIcon />}
          onClick={() => navigate('/assessment')}
          sx={{
            borderRadius: 3.5,
            px: 2.5,
            py: 1,
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

      {top3Recommendations.length === 0 ? (
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 6,
            bgcolor: 'white',
            border: '1.5px solid #F0F2F7',
            boxShadow: '0 8px 30px rgba(100, 110, 140, 0.04)',
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              bgcolor: '#EDEDFE',
              borderRadius: 4,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#635BFF',
              mb: 2,
            }}
          >
            <DoodleRecommend sx={{ fontSize: 34 }} />
          </Box>
          <Typography variant="h6" fontWeight="bold" sx={{ color: '#1A1C24', mb: 1 }}>
            No Career Recommendations Yet
          </Typography>
          <Typography variant="body2" sx={{ color: '#7E8494', mb: 3, maxWidth: 460, mx: 'auto', lineHeight: 1.6 }}>
            Complete the interactive RIASEC assessment test to discover your personality profile and matching tech paths.
          </Typography>
          <Button
            variant="contained"
            startIcon={<DoodleQuiz sx={{ fontSize: 20 }} />}
            onClick={() => navigate('/assessment')}
            sx={{
              bgcolor: '#635BFF',
              fontWeight: 700,
              borderRadius: 3.5,
              px: 3.5,
              py: 1.2,
              textTransform: 'none',
              boxShadow: '0 8px 24px rgba(99, 91, 255, 0.25)',
              '&:hover': { bgcolor: '#534BE8' },
            }}
          >
            Start RIASEC Test
          </Button>
        </Paper>
      ) : (
        <>
          {/* Top #1 Spotlight Banner */}
          {topMatch && (
            <Paper
              sx={{
                p: { xs: 3, md: 4 },
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
              <Box sx={{ maxWidth: 650 }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.5 }}>
                  <Chip
                    icon={<DoodleTrophy sx={{ fontSize: '18px !important', color: '#FFD700 !important' }} />}
                    label="#1 BEST COMPATIBILITY"
                    sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 800, letterSpacing: 0.5 }}
                  />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    Highest algorithmic match
                  </Typography>
                </Stack>

                <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 1 }}>
                  {topMatch.specialtyName}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                  {topMatch.explanation}
                </Typography>
              </Box>

              <Box sx={{ textAlign: { xs: 'left', md: 'right' }, minWidth: 200 }}>
                <Typography variant="caption" sx={{ opacity: 0.8, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>
                  Match Compatibility
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 900, my: 0.5 }}>
                  {topMatch.score?.toFixed(1)}%
                </Typography>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate(`/specialties/${topMatch.specialtyId}`)}
                  sx={{
                    mt: 1,
                    bgcolor: 'white',
                    color: '#635BFF',
                    fontWeight: 800,
                    borderRadius: 3,
                    px: 3,
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#F0EFFF' },
                  }}
                >
                  View Details & Roadmap
                </Button>
              </Box>
            </Paper>
          )}

          {/* Top 3 Matches Grid */}
          <Typography variant="h6" fontWeight="bold" sx={{ color: '#1A1C24', mb: 2.5 }}>
            Top 3 Algorithmic Matches
          </Typography>

          <Grid container spacing={3}>
            {top3Recommendations.map((rec, index) => {
              const score = rec.score || 0;
              const badgeBg = index === 0 ? '#EDEDFE' : index === 1 ? '#E6FAF5' : '#FFF1F3';
              const badgeColor = index === 0 ? '#635BFF' : index === 1 ? '#00D097' : '#FF6482';

              return (
                <Grid key={`${rec.specialtyId || rec.id}-${index}`} size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      borderRadius: 5,
                      p: 1.5,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      border: '1.5px solid #F0F2F7',
                      boxShadow: '0 8px 25px rgba(100, 110, 140, 0.04)',
                      transition: '0.2s',
                      '&:hover': {
                        borderColor: '#635BFF',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 30px rgba(99, 91, 255, 0.12)',
                      },
                    }}
                  >
                    <CardContent sx={{ pb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Chip
                          label={`#${index + 1} Rank`}
                          size="small"
                          sx={{ bgcolor: badgeBg, color: badgeColor, fontWeight: 800, borderRadius: 2 }}
                        />
                        <Typography variant="h6" fontWeight="900" sx={{ color: badgeColor }}>
                          {score.toFixed(1)}%
                        </Typography>
                      </Box>

                      <Typography variant="h6" fontWeight="bold" sx={{ color: '#1A1C24', mb: 1 }}>
                        {rec.specialtyName}
                      </Typography>

                      <Typography variant="body2" sx={{ color: '#7E8494', minHeight: 48, lineHeight: 1.6, mb: 2.5 }}>
                        {rec.explanation}
                      </Typography>

                      <Box sx={{ mb: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">
                            Affinity score
                          </Typography>
                          <Typography variant="caption" fontWeight="bold" sx={{ color: badgeColor }}>
                            {score.toFixed(0)} / 100
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={score}
                          sx={{
                            height: 7,
                            borderRadius: 4,
                            bgcolor: '#F5F6FA',
                            '& .MuiLinearProgress-bar': { bgcolor: badgeColor },
                          }}
                        />
                      </Box>
                    </CardContent>

                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        variant="outlined"
                        endIcon={<ArrowForwardIcon />}
                        onClick={() => navigate(`/specialties/${rec.specialtyId}`)}
                        sx={{
                          borderRadius: 3,
                          borderColor: '#E2E5EE',
                          color: '#635BFF',
                          fontWeight: 700,
                          textTransform: 'none',
                          '&:hover': { bgcolor: '#EDEDFE', borderColor: '#635BFF' },
                        }}
                      >
                        Explore Specialty
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </AppLayout>
  );
}

export default RecommendationsPage;