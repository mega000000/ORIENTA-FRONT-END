import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Chip,
  CircularProgress,
  Grid,
  Avatar,
  LinearProgress,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded';
import AppLayout from '../components/AppLayout';
import {
  DoodleQuiz,
  DoodleCalendar,
  DoodleGraduation,
  DoodleTrophy,
} from '../components/DoodleIcons';
import { getUserSpecialty } from '../api/specialtyApi';
import { getMyGamification } from '../api/gamificationApi';
import { getLatestRecommendations } from '../api/recommendationApi';

const LEVELS = [
  { level: 1, name: 'Découverte', minXp: 0, maxXp: 199 },
  { level: 2, name: 'Exploration', minXp: 200, maxXp: 499 },
  { level: 3, name: 'Orientation', minXp: 500, maxXp: 999 },
  { level: 4, name: 'Construction', minXp: 1000, maxXp: 1799 },
  { level: 5, name: 'Progression', minXp: 1800, maxXp: Infinity },
];

function getLevelInfo(xp) {
  const current = LEVELS.find((l) => xp >= l.minXp && xp <= l.maxXp) || LEVELS[0];
  const next = LEVELS.find((l) => l.level === current.level + 1);
  const progressToNext = next
    ? Math.min(100, Math.max(0, ((xp - current.minXp) / (next.minXp - current.minXp)) * 100))
    : 100;
  return { current, next, progressToNext };
}

function DashboardPage() {
  const [specialty, setSpecialty] = useState(null);
  const [gamification, setGamification] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userName = localStorage.getItem('fullName') || 'Student';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gamificationData = await getMyGamification();
        setGamification(gamificationData);
      } catch {}

      try {
        const specialtyData = await getUserSpecialty();
        setSpecialty(specialtyData);
      } catch {}

      try {
        const recommendationsData = await getLatestRecommendations();
        setRecommendations(recommendationsData || []);
      } catch {}

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <AppLayout activeTab="Dashboard">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress sx={{ color: '#635BFF' }} />
        </Box>
      </AppLayout>
    );
  }

  const xp = gamification?.xp || 0;
  const { current: currentLevel, next: nextLevel, progressToNext } = getLevelInfo(xp);

  const uniqueRecommendations = recommendations.filter(
    (rec, index, self) =>
      index === self.findIndex((r) => (r.specialtyId || r.specialtyName) === (rec.specialtyId || rec.specialtyName))
  );

  return (
    <AppLayout activeTab="Dashboard">
      {/* Welcome Banner + Quick Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Box sx={{ py: 1, mb: 1 }}>
            {/* Clean User Badge */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 1.6,
                py: 0.6,
                bgcolor: '#EDEDFE',
                borderRadius: 5,
                mb: 2,
              }}
            >
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#635BFF' }} />
              <Typography variant="caption" sx={{ color: '#635BFF', fontWeight: 800, letterSpacing: 0.4 }}>
                HELLO, {userName.toUpperCase()}
              </Typography>
            </Box>

            {/* Modern Clean Headline */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.25,
                color: '#1A1C24',
                fontSize: { xs: '1.85rem', md: '2.4rem' },
              }}
            >
              Ready to level up your{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(90deg, #635BFF 0%, #8F85FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                career path?
              </Box>
            </Typography>

            {/* Sub-text */}
            <Typography
              variant="body1"
              sx={{
                color: '#7E8494',
                mt: 1.5,
                maxWidth: 440,
                lineHeight: 1.6,
                fontSize: '0.95rem',
                fontWeight: 500,
              }}
            >
              ORIENTA+ helps you discover matching tech specialties, track learning roadmaps, and earn badges.
            </Typography>

            <Button
              variant="contained"
              startIcon={<DoodleQuiz sx={{ fontSize: 20 }} />}
              onClick={() => navigate('/assessment')}
              sx={{
                mt: 3,
                bgcolor: '#635BFF',
                borderRadius: 3.5,
                px: 3.5,
                py: 1.2,
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '0.95rem',
                boxShadow: '0 8px 24px rgba(99, 91, 255, 0.28)',
                '&:hover': {
                  bgcolor: '#534BE8',
                  boxShadow: '0 10px 28px rgba(99, 91, 255, 0.38)',
                },
              }}
            >
              Start RIASEC Test
            </Button>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, lg: 7 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper
                sx={{
                  p: 2.5,
                  borderRadius: 5,
                  textAlign: 'center',
                  height: '100%',
                  bgcolor: 'white',
                  border: '1.5px solid #F0F2F7',
                  boxShadow: '0 4px 20px rgba(100, 110, 140, 0.04)',
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: '#EDEDFE',
                    color: '#1A1C24',
                    mx: 'auto',
                    mb: 1.5,
                    width: 52,
                    height: 52,
                    borderRadius: 3.5,
                  }}
                >
                  <DoodleCalendar sx={{ fontSize: 28 }} />
                </Avatar>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#1A1C24' }}>
                  Stay Focused
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Level {currentLevel.level} Achieved
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper
                sx={{
                  p: 2.5,
                  borderRadius: 5,
                  textAlign: 'center',
                  height: '100%',
                  bgcolor: 'white',
                  border: '1.5px solid #F0F2F7',
                  boxShadow: '0 4px 20px rgba(100, 110, 140, 0.04)',
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: '#E6FAF5',
                    color: '#1A1C24',
                    mx: 'auto',
                    mb: 1.5,
                    width: 52,
                    height: 52,
                    borderRadius: 3.5,
                  }}
                >
                  <DoodleGraduation sx={{ fontSize: 28 }} />
                </Avatar>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#1A1C24' }}>
                  Roadmap Steps
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Earn XP per completed task
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, sm: 4 }}>
              <Paper
                sx={{
                  p: 2.5,
                  borderRadius: 5,
                  textAlign: 'center',
                  height: '100%',
                  bgcolor: 'white',
                  border: '1.5px solid #F0F2F7',
                  boxShadow: '0 4px 20px rgba(100, 110, 140, 0.04)',
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: '#FFF1F3',
                    color: '#1A1C24',
                    mx: 'auto',
                    mb: 1.5,
                    width: 52,
                    height: 52,
                    borderRadius: 3.5,
                  }}
                >
                  <DoodleTrophy sx={{ fontSize: 28 }} />
                </Avatar>
                <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#1A1C24' }}>
                  Unlock Badges
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Certify career orientation
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Main Grid */}
      <Grid container spacing={3}>
        {/* Target Specialty Card */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            sx={{
              p: 3.5,
              borderRadius: 6,
              bgcolor: '#635BFF',
              color: 'white',
              minHeight: 280,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 12px 35px rgba(99, 91, 255, 0.3)',
            }}
          >
            <Box>
              <Chip
                label="TARGET CAREER"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 800,
                  letterSpacing: 0.5,
                  mb: 2,
                }}
              />
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {specialty ? specialty.name : 'No Target Selected'}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.85, mt: 1, lineHeight: 1.6 }}>
                {specialty
                  ? specialty.description
                  : 'Choose your preferred specialty from the RIASEC recommendation test to activate your learning journey.'}
              </Typography>
            </Box>

            <Box sx={{ mt: 3 }}>
              {specialty ? (
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate(`/learning-paths/${specialty.id}`)}
                  sx={{
                    bgcolor: 'white',
                    color: '#635BFF',
                    fontWeight: 800,
                    borderRadius: 3,
                    px: 3,
                    textTransform: 'none',
                    '&:hover': { bgcolor: '#F0EFFF' },
                  }}
                >
                  Continue Roadmap
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => navigate('/recommendations')}
                  sx={{
                    color: 'white',
                    borderColor: 'white',
                    fontWeight: 700,
                    borderRadius: 3,
                    textTransform: 'none',
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                  }}
                >
                  Browse Matches
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Gamification Progress */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            sx={{
              p: 3.5,
              borderRadius: 6,
              bgcolor: 'white',
              border: '1.5px solid #F0F2F7',
              height: '100%',
              boxShadow: '0 8px 30px rgba(100, 110, 140, 0.04)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#1A1C24' }}>
                  Level {currentLevel.level}: {currentLevel.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Total XP: {xp}
                </Typography>
              </Box>
              <Chip
                label={`${xp} XP Earned`}
                sx={{ bgcolor: '#EDEDFE', color: '#635BFF', fontWeight: 800, borderRadius: 2 }}
              />
            </Box>

            <Box sx={{ my: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Next milestone: {nextLevel ? `Level ${nextLevel.level}` : 'Max'}
                </Typography>
                <Typography variant="caption" fontWeight="bold" sx={{ color: '#635BFF' }}>
                  {nextLevel ? `${nextLevel.minXp - xp} XP needed` : 'Completed!'}
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progressToNext}
                sx={{
                  height: 9,
                  borderRadius: 5,
                  bgcolor: '#F5F6FA',
                  '& .MuiLinearProgress-bar': { bgcolor: '#635BFF' },
                }}
              />
            </Box>

            <Typography variant="subtitle2" fontWeight="bold" mb={1.5} sx={{ color: '#1A1C24' }}>
              Earned Badges
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {!gamification?.badges || gamification.badges.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No badges yet. Start steps to unlock your first badge!
                </Typography>
              ) : (
                gamification.badges.map((badge, idx) => (
                  <Chip
                    key={idx}
                    icon={<DoodleTrophy sx={{ fontSize: '18px !important', color: '#FF6482 !important' }} />}
                    label={badge}
                    sx={{
                      bgcolor: '#FFF1F3',
                      color: '#FF6482',
                      fontWeight: 700,
                      borderRadius: 2.5,
                    }}
                  />
                ))
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Matches */}
        {uniqueRecommendations.length > 0 && (
          <Grid size={{ xs: 12 }}>
            <Paper
              sx={{
                p: 3.5,
                borderRadius: 6,
                bgcolor: 'white',
                border: '1.5px solid #F0F2F7',
                mt: 1,
                boxShadow: '0 8px 30px rgba(100, 110, 140, 0.04)',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#1A1C24' }}>
                  Top RIASEC Matches
                </Typography>
                <Button
                  size="small"
                  onClick={() => navigate('/recommendations')}
                  sx={{ color: '#635BFF', fontWeight: 700, textTransform: 'none' }}
                >
                  View All Matches →
                </Button>
              </Box>

              <Grid container spacing={2}>
                {uniqueRecommendations.slice(0, 3).map((rec, index) => (
                  <Grid key={`${rec.specialtyId || rec.id}-${index}`} size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card
                      sx={{
                        borderRadius: 4,
                        cursor: 'pointer',
                        boxShadow: 'none',
                        border: '1.5px solid #F0F2F7',
                        transition: '0.2s',
                        '&:hover': {
                          borderColor: '#635BFF',
                          transform: 'translateY(-3px)',
                          boxShadow: '0 8px 25px rgba(99, 91, 255, 0.08)',
                        },
                      }}
                      onClick={() => navigate(`/specialties/${rec.specialtyId}`)}
                    >
                      <CardContent sx={{ p: 2.5 }}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ color: '#1A1C24' }}>
                          {rec.specialtyName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
                          Compatibility Score
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={rec.score || 0}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            bgcolor: '#F5F6FA',
                            '& .MuiLinearProgress-bar': { bgcolor: '#00D097' },
                            mb: 1,
                          }}
                        />
                        <Typography variant="body2" fontWeight="800" sx={{ color: '#00D097' }}>
                          {rec.score?.toFixed(1)}% Match
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
    </AppLayout>
  );
}

export default DashboardPage;