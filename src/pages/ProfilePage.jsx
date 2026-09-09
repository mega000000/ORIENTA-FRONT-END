import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  Button,
  Stack,
  CircularProgress,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AppLayout from '../components/AppLayout';
import {
  DoodleProfile,
  DoodleGraduation,
  DoodleTrophy,
} from '../components/DoodleIcons';
import { getUserSpecialty } from '../api/specialtyApi';
import { getMyGamification } from '../api/gamificationApi';
import axiosInstance from '../api/axiosInstance';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [specialty, setSpecialty] = useState(null);
  const [gamification, setGamification] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    navigate('/login');
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        try {
          const res = await axiosInstance.get('/auth/me');
          setProfile(res.data);
        } catch {
          setProfile({
            fullName: localStorage.getItem('fullName') || 'Student User',
            email: localStorage.getItem('email') || 'N/A',
            role: localStorage.getItem('role') || 'STUDENT',
          });
        }

        try {
          const spec = await getUserSpecialty();
          setSpecialty(spec);
        } catch {}

        try {
          const gami = await getMyGamification();
          setGamification(gami);
        } catch {}
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <AppLayout activeTab="Profile">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
          <CircularProgress sx={{ color: '#635BFF' }} />
        </Box>
      </AppLayout>
    );
  }

  const displayName = profile?.fullName || localStorage.getItem('fullName') || 'Student';
  const displayEmail = profile?.email || localStorage.getItem('email') || 'N/A';
  const displayRole = profile?.role || localStorage.getItem('role') || 'STUDENT';
  const xp = gamification?.xp || 0;
  const userLevel = Math.floor(xp / 200) + 1;

  return (
    <AppLayout activeTab="Profile">
      <Stack spacing={2} sx={{ width: '100%', maxWidth: 1050, mx: 'auto' }}>
        {/* Compact Clean Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.8,
                px: 1.2,
                py: 0.35,
                bgcolor: '#EDEDFE',
                borderRadius: 4,
                mb: 0.6,
              }}
            >
              <DoodleProfile sx={{ fontSize: 16, color: '#635BFF' }} />
              <Typography variant="caption" sx={{ color: '#635BFF', fontWeight: 800, fontSize: '0.72rem', letterSpacing: 0.4 }}>
                STUDENT SETTINGS
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
              My{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(90deg, #635BFF 0%, #8F85FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Profile
              </Box>
            </Typography>
          </Box>

          <Button
            variant="outlined"
            size="small"
            startIcon={<LogoutIcon sx={{ fontSize: 16 }} />}
            onClick={handleLogout}
            sx={{
              borderRadius: 2.5,
              px: 2,
              py: 0.6,
              fontWeight: 700,
              fontSize: '0.8rem',
              textTransform: 'none',
              borderColor: '#FFE0E5',
              color: '#FF4D73',
              bgcolor: '#FFF5F6',
              '&:hover': {
                bgcolor: '#FFE8EC',
                borderColor: '#FF4D73',
              },
            }}
          >
            Sign Out
          </Button>
        </Box>

        {/* 2 Main Balanced Cards - No Empty Long Bars */}
        <Grid container spacing={2} alignItems="stretch">
          {/* Left: User Identity & Account Card */}
          <Grid size={{ xs: 12, md: 5.5 }}>
            <Paper
              sx={{
                p: 2.5,
                borderRadius: 4.5,
                bgcolor: 'white',
                border: '1.5px solid #F0F2F7',
                boxShadow: '0 4px 20px rgba(100, 110, 140, 0.03)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                {/* Hero Avatar + User Meta Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.8, mb: 2.5 }}>
                  <Avatar
                    sx={{
                      bgcolor: '#635BFF',
                      color: 'white',
                      fontSize: '1.4rem',
                      fontWeight: 900,
                      width: 54,
                      height: 54,
                      borderRadius: 3,
                      boxShadow: '0 6px 18px rgba(99, 91, 255, 0.28)',
                    }}
                  >
                    {displayName.charAt(0).toUpperCase()}
                  </Avatar>

                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#1A1C24', fontSize: '1.1rem', lineHeight: 1.2 }}>
                      {displayName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#7E8494', fontSize: '0.78rem' }}>
                      {displayEmail}
                    </Typography>
                  </Box>
                </Box>

                {/* Info Fields */}
                <Stack spacing={1.2}>
                  <Box sx={{ p: 1.2, borderRadius: 2.8, bgcolor: '#FAFBFD', border: '1.2px solid #F0F2F7', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 30, height: 30, borderRadius: 2, bgcolor: '#EDEDFE', color: '#635BFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <PersonOutlineIcon sx={{ fontSize: 16 }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#8A90A2', fontSize: '0.66rem', fontWeight: 700, display: 'block' }}>
                        DISPLAY NAME
                      </Typography>
                      <Typography sx={{ fontWeight: 800, color: '#1A1C24', fontSize: '0.84rem' }}>
                        {displayName}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ p: 1.2, borderRadius: 2.8, bgcolor: '#FAFBFD', border: '1.2px solid #F0F2F7', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ width: 30, height: 30, borderRadius: 2, bgcolor: '#EDEDFE', color: '#635BFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <EmailOutlinedIcon sx={{ fontSize: 16 }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#8A90A2', fontSize: '0.66rem', fontWeight: 700, display: 'block' }}>
                        EMAIL ACCOUNT
                      </Typography>
                      <Typography sx={{ fontWeight: 800, color: '#1A1C24', fontSize: '0.84rem' }}>
                        {displayEmail}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ p: 1.2, borderRadius: 2.8, bgcolor: '#FAFBFD', border: '1.2px solid #F0F2F7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ width: 30, height: 30, borderRadius: 2, bgcolor: '#EDEDFE', color: '#635BFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <BadgeOutlinedIcon sx={{ fontSize: 16 }} />
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#8A90A2', fontSize: '0.66rem', fontWeight: 700, display: 'block' }}>
                          ACCESS ROLE
                        </Typography>
                        <Typography sx={{ fontWeight: 800, color: '#1A1C24', fontSize: '0.84rem' }}>
                          {displayRole}
                        </Typography>
                      </Box>
                    </Box>
                    <Chip
                      label="VERIFIED"
                      size="small"
                      sx={{ bgcolor: '#E6FAF5', color: '#00D097', fontWeight: 800, fontSize: '0.65rem', height: 20 }}
                    />
                  </Box>
                </Stack>
              </Box>
            </Paper>
          </Grid>

          {/* Right: Academic Status & Gamification Hub */}
          <Grid size={{ xs: 12, md: 6.5 }}>
            <Paper
              sx={{
                p: 2.5,
                borderRadius: 4.5,
                bgcolor: 'white',
                border: '1.5px solid #F0F2F7',
                boxShadow: '0 4px 20px rgba(100, 110, 140, 0.03)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                {/* Header: Title + Level Badge */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 2.5,
                        bgcolor: '#E6FAF5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#00D097',
                      }}
                    >
                      <DoodleGraduation sx={{ fontSize: 18 }} />
                    </Box>
                    <Typography variant="subtitle1" fontWeight="800" sx={{ color: '#1A1C24', fontSize: '0.94rem' }}>
                      Academic & Progression
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      px: 1.2,
                      py: 0.4,
                      borderRadius: 2,
                      bgcolor: '#EDEDFE',
                      color: '#635BFF',
                      fontWeight: 900,
                      fontSize: '0.74rem',
                      letterSpacing: 0.3,
                    }}
                  >
                    LEVEL {userLevel}
                  </Box>
                </Box>

                <Stack spacing={1.2}>
                  {/* Specialty */}
                  <Box sx={{ p: 1.3, borderRadius: 2.8, bgcolor: '#FAFBFD', border: '1.2px solid #F0F2F7' }}>
                    <Typography variant="caption" sx={{ color: '#8A90A2', fontSize: '0.66rem', fontWeight: 700, display: 'block' }}>
                      ACTIVE TARGET SPECIALTY
                    </Typography>
                    <Typography sx={{ fontWeight: 800, color: specialty ? '#635BFF' : '#8A90A2', fontSize: '0.9rem', mt: 0.2 }}>
                      {specialty ? specialty.name : 'No specialty selected yet'}
                    </Typography>
                  </Box>

                  {/* XP Metrics */}
                  <Box sx={{ p: 1.3, borderRadius: 2.8, bgcolor: '#FAFBFD', border: '1.2px solid #F0F2F7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: '#8A90A2', fontSize: '0.66rem', fontWeight: 700, display: 'block' }}>
                        CAREER XP BALANCE
                      </Typography>
                      <Typography sx={{ fontWeight: 800, color: '#1A1C24', fontSize: '0.9rem', mt: 0.2 }}>
                        {xp} Total Experience
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        px: 1.2,
                        py: 0.4,
                        borderRadius: 2,
                        bgcolor: '#FFF7E6',
                        color: '#FFB800',
                        fontWeight: 900,
                        fontSize: '0.78rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.6,
                      }}
                    >
                      <DoodleTrophy sx={{ fontSize: 15 }} /> {xp} XP
                    </Box>
                  </Box>

                  {/* Badges List */}
                  <Box sx={{ pt: 0.5 }}>
                    <Typography variant="caption" sx={{ color: '#8A90A2', fontSize: '0.66rem', fontWeight: 700, display: 'block', mb: 0.8, textTransform: 'uppercase' }}>
                      Unlocked Achievements
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                      {!gamification?.badges || gamification.badges.length === 0 ? (
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                          No badges unlocked yet. Complete tasks to earn achievements!
                        </Typography>
                      ) : (
                        gamification.badges.map((badge, idx) => (
                          <Box
                            key={idx}
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 0.8,
                              px: 1.2,
                              py: 0.45,
                              borderRadius: 2.2,
                              bgcolor: '#FAFBFD',
                              border: '1.2px solid #F0F2F7',
                              transition: 'all 0.15s ease',
                              '&:hover': {
                                borderColor: '#635BFF',
                                bgcolor: 'white',
                                transform: 'translateY(-1.5px)',
                              },
                            }}
                          >
                            <Box
                              sx={{
                                width: 18,
                                height: 18,
                                borderRadius: 1.5,
                                bgcolor: '#EDEDFE',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#635BFF',
                              }}
                            >
                              <DoodleTrophy sx={{ fontSize: 11 }} />
                            </Box>
                            <Typography sx={{ fontSize: '0.74rem', fontWeight: 700, color: '#1A1C24' }}>
                              {badge}
                            </Typography>
                            <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#00D097' }} />
                          </Box>
                        ))
                      )}
                    </Box>
                  </Box>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Stack>
    </AppLayout>
  );
}

export default ProfilePage;