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
  Divider,
  CircularProgress,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineRounded';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import EmojiEventsIcon from '@mui/icons-material/EmojiEventsRounded';
import SchoolIcon from '@mui/icons-material/SchoolRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import AppLayout from '../components/AppLayout';
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
          // استرجاع البيانات المخزنة محلياً عند تسجيل الدخول
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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress sx={{ color: '#635BFF' }} />
        </Box>
      </AppLayout>
    );
  }

  const displayName = profile?.fullName || localStorage.getItem('fullName') || 'Student';
  const displayEmail = profile?.email || localStorage.getItem('email') || 'N/A';
  const displayRole = profile?.role || localStorage.getItem('role') || 'STUDENT';

  return (
    <AppLayout activeTab="Profile">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1A1C24', mb: 1 }}>
          My Profile 👤
        </Typography>
        <Typography variant="body2" sx={{ color: '#7E8494' }}>
          Manage your account settings, track progress, and review active orientation track.
        </Typography>
      </Box>

      {/* Profile Card Hero */}
      <Paper
        sx={{
          p: 4,
          borderRadius: 6,
          bgcolor: 'white',
          border: '1.5px solid #F0F2F7',
          boxShadow: '0 10px 30px rgba(100, 110, 140, 0.05)',
          mb: 4,
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: { xs: 'flex-start', sm: 'center' } }}>
          <Avatar
            sx={{
              bgcolor: '#635BFF',
              color: 'white',
              fontSize: '2rem',
              fontWeight: 'bold',
              width: 80,
              height: 80,
              borderRadius: 4,
              boxShadow: '0 8px 24px rgba(99, 91, 255, 0.3)',
            }}
          >
            {displayName.charAt(0).toUpperCase()}
          </Avatar>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#1A1C24' }}>
              {displayName}
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ mt: 1, alignItems: 'center', flexWrap: 'wrap' }}>
              <Chip
                label={displayRole}
                size="small"
                sx={{ bgcolor: '#EDEDFE', color: '#635BFF', fontWeight: 800, borderRadius: 2 }}
              />
              <Typography variant="body2" sx={{ color: '#7E8494' }}>
                {displayEmail}
              </Typography>
            </Stack>
          </Box>

          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ borderRadius: 3, fontWeight: 700, textTransform: 'none' }}
          >
            Logout
          </Button>
        </Stack>
      </Paper>

      {/* Account Details & Stats */}
      <Grid container spacing={3}>
        {/* User Information */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3.5, borderRadius: 5, bgcolor: 'white', border: '1.5px solid #F0F2F7', height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#1A1C24', mb: 3 }}>
              Account Information
            </Typography>

            <Stack spacing={2.5}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PersonOutlineIcon sx={{ color: '#635BFF' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">Full Name</Typography>
                  <Typography variant="body1" fontWeight="bold">{displayName}</Typography>
                </Box>
              </Box>

              <Divider sx={{ borderColor: '#F5F6FA' }} />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EmailOutlinedIcon sx={{ color: '#635BFF' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">Email Address</Typography>
                  <Typography variant="body1" fontWeight="bold">{displayEmail}</Typography>
                </Box>
              </Box>

              <Divider sx={{ borderColor: '#F5F6FA' }} />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <BadgeOutlinedIcon sx={{ color: '#635BFF' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">Role / Privileges</Typography>
                  <Typography variant="body1" fontWeight="bold">{displayRole}</Typography>
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Academic & Orientation Status */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 3.5, borderRadius: 5, bgcolor: 'white', border: '1.5px solid #F0F2F7', height: '100%' }}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#1A1C24', mb: 3 }}>
              Academic & Orientation Status
            </Typography>

            <Stack spacing={2.5}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <SchoolIcon sx={{ color: '#00D097' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">Active Target Specialty</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {specialty ? specialty.name : 'No specialty selected yet'}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ borderColor: '#F5F6FA' }} />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EmojiEventsIcon sx={{ color: '#FFB800' }} />
                <Box>
                  <Typography variant="caption" color="text.secondary">Gamification Total XP</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {gamification?.xp || 0} Total XP
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ borderColor: '#F5F6FA' }} />

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', pt: 1 }}>
                {gamification?.badges && gamification.badges.length > 0 ? (
                  gamification.badges.map((b, i) => (
                    <Chip key={i} label={b} size="small" sx={{ bgcolor: '#FFF1F3', color: '#FF6482', fontWeight: 700 }} />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No badges earned yet.
                  </Typography>
                )}
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </AppLayout>
  );
}

export default ProfilePage;