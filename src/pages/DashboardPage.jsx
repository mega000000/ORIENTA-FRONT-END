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
  Button,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded';
import AppLayout from '../components/AppLayout';
import {
  DoodleQuiz,
  DoodleCalendar,
  DoodleGraduation,
  DoodleTrophy,
  DoodleRecommend,
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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
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
      <Stack spacing={2.5} sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}>
        {/* Row 1: Header + 3 Small Feature Cards */}
        <Grid container spacing={2.5} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ pr: { md: 2 } }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.8,
                  px: 1.2,
                  py: 0.4,
                  bgcolor: '#EDEDFE',
                  borderRadius: 4,
                  mb: 1.2,
                }}
              >
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#635BFF' }} />
                <Typography variant="caption" sx={{ color: '#635BFF', fontWeight: 800, fontSize: '0.72rem', letterSpacing: 0.3 }}>
                  HELLO, {userName.toUpperCase()}
                </Typography>
              </Box>

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  color: '#1A1C24',
                  fontSize: { xs: '1.4rem', md: '1.75rem' },
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

              <Typography variant="body2" sx={{ color: '#7E8494', mt: 0.8, fontSize: '0.86rem', lineHeight: 1.5 }}>
                ORIENTA+ helps you discover matching tech specialties, track roadmaps, and earn badges.
              </Typography>

              <Button
                variant="contained"
                size="small"
                startIcon={<DoodleQuiz sx={{ fontSize: 18 }} />}
                onClick={() => navigate('/assessment')}
                sx={{
                  mt: 2,
                  bgcolor: '#635BFF',
                  borderRadius: 2.5,
                  px: 2.5,
                  py: 0.8,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  boxShadow: '0 4px 14px rgba(99, 91, 255, 0.25)',
                  '&:hover': { bgcolor: '#534BE8' },
                }}
              >
                Start RIASEC Test
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Grid container spacing={1.5}>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 4,
                    textAlign: 'center',
                    bgcolor: 'white',
                    border: '1.5px solid #F0F2F7',
                    boxShadow: '0 4px 18px rgba(100, 110, 140, 0.03)',
                  }}
                >
                  <Avatar sx={{ bgcolor: '#FAFBFD', border: '1px solid #F0F2F7', color: '#1A1C24', mx: 'auto', mb: 1.2, width: 44, height: 44, borderRadius: 2.5 }}>
                    <DoodleCalendar sx={{ fontSize: 22 }} />
                  </Avatar>
                  <Typography variant="subtitle2" fontWeight="800" sx={{ fontSize: '0.88rem', color: '#1A1C24' }}>
                    Stay Focused
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#7E8494', fontSize: '0.74rem', fontWeight: 600 }}>
                    Level {currentLevel.level} Achieved
                  </Typography>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 4,
                    textAlign: 'center',
                    bgcolor: 'white',
                    border: '1.5px solid #F0F2F7',
                    boxShadow: '0 4px 18px rgba(100, 110, 140, 0.03)',
                  }}
                >
                  <Avatar sx={{ bgcolor: '#FAFBFD', border: '1px solid #F0F2F7', color: '#1A1C24', mx: 'auto', mb: 1.2, width: 44, height: 44, borderRadius: 2.5 }}>
                    <DoodleGraduation sx={{ fontSize: 22 }} />
                  </Avatar>
                  <Typography variant="subtitle2" fontWeight="800" sx={{ fontSize: '0.88rem', color: '#1A1C24' }}>
                    Roadmap Steps
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#7E8494', fontSize: '0.74rem', fontWeight: 600 }}>
                    Earn XP per task
                  </Typography>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, sm: 4 }}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 4,
                    textAlign: 'center',
                    bgcolor: 'white',
                    border: '1.5px solid #F0F2F7',
                    boxShadow: '0 4px 18px rgba(100, 110, 140, 0.03)',
                  }}
                >
                  <Avatar sx={{ bgcolor: '#FAFBFD', border: '1px solid #F0F2F7', color: '#1A1C24', mx: 'auto', mb: 1.2, width: 44, height: 44, borderRadius: 2.5 }}>
                    <DoodleTrophy sx={{ fontSize: 22 }} />
                  </Avatar>
                  <Typography variant="subtitle2" fontWeight="800" sx={{ fontSize: '0.88rem', color: '#1A1C24' }}>
                    Unlock Badges
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#7E8494', fontSize: '0.74rem', fontWeight: 600 }}>
                    Career certification
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Row 2: Target Career + Gamified Level Progression */}
        <Grid container spacing={2.5} alignItems="stretch">
          {/* Solid Target Career Card */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4.5,
                bgcolor: '#635BFF',
                color: 'white',
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 12px 32px rgba(99, 91, 255, 0.22)',
              }}
            >
              <Box>
                <Chip
                  label="TARGET CAREER"
                  size="small"
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 800, fontSize: '0.65rem', mb: 1.5 }}
                />
                <Typography variant="h6" fontWeight="800" sx={{ fontSize: '1.25rem', mb: 0.8, letterSpacing: '-0.01em' }}>
                  {specialty ? specialty.name : 'No Target Selected'}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.9,
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {specialty
                    ? specialty.description
                    : 'Choose your preferred specialty from the RIASEC recommendation test to activate your roadmap.'}
                </Typography>
              </Box>

              <Box sx={{ mt: 3 }}>
                {specialty ? (
                  <Button
                    variant="contained"
                    size="small"
                    endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                    onClick={() => navigate(`/learning-paths/${specialty.id}`)}
                    sx={{
                      bgcolor: 'white',
                      color: '#635BFF',
                      fontWeight: 800,
                      borderRadius: 2.5,
                      px: 2.5,
                      py: 0.8,
                      fontSize: '0.82rem',
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#F5F6FA', transform: 'translateY(-1px)' },
                      transition: 'all 0.2s',
                    }}
                  >
                    Continue Roadmap
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate('/recommendations')}
                    sx={{
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.5)',
                      fontWeight: 700,
                      borderRadius: 2.5,
                      px: 2.5,
                      textTransform: 'none',
                      '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                    }}
                  >
                    Browse Matches
                  </Button>
                )}
              </Box>
            </Paper>
          </Grid>

          {/* Gamified Level & XP Card (Solid White) */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 4.5,
                bgcolor: 'white',
                border: '1.5px solid #F0F2F7',
                boxShadow: '0 4px 18px rgba(100, 110, 140, 0.03)',
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Header: Level Rank Badge + Total XP Chip */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 3.5,
                      bgcolor: '#FBFBFE',
                      border: '1.5px solid #635BFF',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography sx={{ fontSize: '0.65rem', fontWeight: 900, color: '#635BFF', lineHeight: 1 }}>
                      LVL
                    </Typography>
                    <Typography sx={{ fontSize: '1.2rem', fontWeight: 900, color: '#635BFF', lineHeight: 1 }}>
                      {currentLevel.level}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#1A1C24', fontSize: '1.05rem', lineHeight: 1.2 }}>
                      {currentLevel.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#7E8494', fontWeight: 600, fontSize: '0.78rem' }}>
                      Current Rank Tier
                    </Typography>
                  </Box>
                </Stack>

                <Box
                  sx={{
                    px: 2,
                    py: 0.8,
                    borderRadius: 3,
                    bgcolor: '#2B2D31',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.8,
                  }}
                >
                  <DoodleTrophy sx={{ fontSize: 16, color: '#FFD700' }} />
                  <Typography sx={{ fontWeight: 800, fontSize: '0.85rem', letterSpacing: 0.3 }}>
                    {xp}{' '}
                    <Box component="span" sx={{ color: '#8F85FF', fontWeight: 700, fontSize: '0.75rem' }}>
                      XP
                    </Box>
                  </Typography>
                </Box>
              </Box>

              {/* Center: XP Progress Bar */}
              <Box sx={{ my: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="caption" sx={{ color: '#7E8494', fontWeight: 700, fontSize: '0.78rem' }}>
                    Progress to Level {nextLevel ? nextLevel.level : 'MAX'}
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 800, color: '#635BFF', fontSize: '0.78rem' }}>
                    {nextLevel ? `${nextLevel.minXp - xp} XP needed` : 'Max Level Reached!'}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    position: 'relative',
                    height: 12,
                    borderRadius: 6,
                    bgcolor: '#F5F6FA',
                    p: '2px',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${progressToNext}%`,
                      borderRadius: 5,
                      background: 'linear-gradient(90deg, #00D097 0%, #635BFF 100%)',
                      transition: 'width 0.4s ease-in-out',
                    }}
                  />
                </Box>
              </Box>

              {/* Footer: Unlocked Achievements */}
              <Box sx={{ pt: 1.5, borderTop: '1px solid #F5F6FA' }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 800,
                    color: '#8A90A2',
                    letterSpacing: 0.6,
                    fontSize: '0.7rem',
                    display: 'block',
                    mb: 1.2,
                    textTransform: 'uppercase',
                  }}
                >
                  Unlocked Achievements
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.2 }}>
                  {!gamification?.badges || gamification.badges.length === 0 ? (
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.78rem', fontWeight: 600 }}>
                      No badges unlocked yet. Complete tasks to earn achievements!
                    </Typography>
                  ) : (
                    gamification.badges.map((badge, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 1,
                          px: 1.5,
                          py: 0.6,
                          borderRadius: 3,
                          bgcolor: '#FAFBFD',
                          border: '1.2px solid #F0F2F7',
                        }}
                      >
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: 2,
                            bgcolor: '#EDEDFE',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#635BFF',
                          }}
                        >
                          <DoodleTrophy sx={{ fontSize: 13 }} />
                        </Box>
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 800, color: '#1A1C24' }}>
                          {badge}
                        </Typography>
                        <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: '#00D097' }} />
                      </Box>
                    ))
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Row 3: Bottom RIASEC Top Matches (Solid White) */}
        {uniqueRecommendations.length > 0 && (
          <Paper
            sx={{
              p: 2.5,
              borderRadius: 4.5,
              width: '100%',
              boxSizing: 'border-box',
              bgcolor: 'white',
              border: '1.5px solid #F0F2F7',
              boxShadow: '0 4px 18px rgba(100, 110, 140, 0.03)',
            }}
          >
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Stack direction="row" spacing={1.2} alignItems="center">
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: 2,
                    bgcolor: '#EDEDFE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#635BFF',
                  }}
                >
                  <DoodleRecommend sx={{ fontSize: 16 }} />
                </Box>
                <Typography variant="subtitle1" fontWeight="800" sx={{ color: '#1A1C24', fontSize: '0.98rem' }}>
                  Top RIASEC Matches
                </Typography>
              </Stack>

              <Button
                size="small"
                onClick={() => navigate('/recommendations')}
                sx={{
                  color: '#635BFF',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  textTransform: 'none',
                  p: '6px 12px',
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#F5F6FA' },
                }}
              >
                View All →
              </Button>
            </Box>

            {/* Cards Grid */}
            <Grid container spacing={2}>
              {uniqueRecommendations.slice(0, 3).map((rec, index) => {
                const score = rec.score || 0;
                const rankColor = index === 0 ? '#635BFF' : index === 1 ? '#00D097' : '#FF9500';
                const rankBg = index === 0 ? '#EDEDFE' : index === 1 ? '#E6FAF5' : '#FFF7E6';

                return (
                  <Grid key={`${rec.specialtyId || rec.id}-${index}`} size={{ xs: 12, sm: 4 }}>
                    <Card
                      elevation={0}
                      sx={{
                        borderRadius: 3.5,
                        cursor: 'pointer',
                        border: '1.5px solid #F0F2F7',
                        bgcolor: 'white',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: '#635BFF',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 24px rgba(99, 91, 255, 0.12)',
                          '& .arrow-btn': {
                            transform: 'translateX(3px)',
                            color: '#635BFF',
                          },
                        },
                      }}
                      onClick={() => navigate(`/specialties/${rec.specialtyId}`)}
                    >
                      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                        {/* Top Row: Rank Tag + Score Pill */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                          <Box
                            sx={{
                              px: 1.2,
                              py: 0.4,
                              borderRadius: 1.8,
                              bgcolor: rankBg,
                              color: rankColor,
                              fontSize: '0.7rem',
                              fontWeight: 900,
                              letterSpacing: 0.3,
                            }}
                          >
                            #{index + 1} MATCH
                          </Box>

                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              px: 1.2,
                              py: 0.4,
                              borderRadius: 2,
                              bgcolor: '#E6FAF5',
                            }}
                          >
                            <Typography sx={{ color: '#00D097', fontWeight: 900, fontSize: '0.8rem' }}>
                              {score.toFixed(1)}%
                            </Typography>
                          </Box>
                        </Box>

                        {/* Specialty Name + Arrow */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.2 }}>
                          <Typography
                            variant="subtitle2"
                            fontWeight="800"
                            noWrap
                            sx={{ color: '#1A1C24', fontSize: '0.92rem' }}
                          >
                            {rec.specialtyName}
                          </Typography>
                          <ArrowForwardIcon
                            className="arrow-btn"
                            sx={{ fontSize: 18, color: '#A0A7BA', transition: 'transform 0.2s ease, color 0.2s ease' }}
                          />
                        </Box>

                        {/* Progress Bar */}
                        <Box sx={{ mt: 1.5 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.6 }}>
                            <Typography variant="caption" sx={{ color: '#8A90A2', fontSize: '0.72rem', fontWeight: 700 }}>
                              Compatibility Fit
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              bgcolor: '#F5F6FA',
                              p: '1px',
                            }}
                          >
                            <Box
                              sx={{
                                height: '100%',
                                width: `${score}%`,
                                borderRadius: 3,
                                bgcolor: '#00D097',
                                transition: 'width 0.4s ease',
                              }}
                            />
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        )}
      </Stack>
    </AppLayout>
  );
}

export default DashboardPage;