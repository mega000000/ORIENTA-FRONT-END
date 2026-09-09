import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Stack,
  IconButton,
  Tooltip,
  Typography,
  Avatar,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNoneRounded';
import {
  DoodleDashboard,
  DoodleQuiz,
  DoodleExplore,
  DoodleRecommend,
  DoodleProfile,
} from './DoodleIcons';

function AppLayout({ children, activeTab = 'Dashboard' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = localStorage.getItem('fullName') || 'Student';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const navItems = [
    { title: 'Dashboard', path: '/dashboard', icon: <DoodleDashboard sx={{ fontSize: 24 }} /> },
    { title: 'RIASEC Test', path: '/assessment', icon: <DoodleQuiz sx={{ fontSize: 24 }} /> },
    { title: 'Specialties', path: '/specialties', icon: <DoodleExplore sx={{ fontSize: 24 }} /> },
    { title: 'Recommendations', path: '/recommendations', icon: <DoodleRecommend sx={{ fontSize: 24 }} /> },
    { title: 'Profile', path: '/profile', icon: <DoodleProfile sx={{ fontSize: 24 }} /> },
  ];

  return (
    <Box sx={{ display: 'flex', bgcolor: '#F5F6FA', minHeight: '100vh', p: { xs: 1.5, md: 3 } }}>
      {/* Curved Sidebar */}
      <Box
        sx={{
          width: 80,
          bgcolor: '#635BFF',
          borderRadius: 6,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
          py: 4,
          boxShadow: '0 10px 40px rgba(99, 91, 255, 0.25)',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <Stack spacing={3} sx={{ alignItems: 'center' }}>
          <Box
            sx={{
              width: 46,
              height: 46,
              bgcolor: 'rgba(255,255,255,0.2)',
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 900,
              fontSize: '1.2rem',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/dashboard')}
          >
            O+
          </Box>

          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Tooltip key={item.path} title={item.title} placement="right">
                <IconButton
                  sx={{
                    color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                    bgcolor: isActive ? 'rgba(255,255,255,0.25)' : 'transparent',
                    borderRadius: 3,
                    p: 1.2,
                    '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.15)' },
                  }}
                  onClick={() => navigate(item.path)}
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            );
          })}
        </Stack>

        <Tooltip title="Logout" placement="right">
          <IconButton
            sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: '#FF7B90' } }}
            onClick={handleLogout}
          >
            <LogoutIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Main Page Area */}
      <Box sx={{ flexGrow: 1, pl: { xs: 0, md: 4 }, pr: { xs: 0, md: 1 }, overflowX: 'hidden' }}>
        {/* Top Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3.5 }}>
          <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Typography
                  key={item.path}
                  variant="body2"
                  fontWeight={isActive ? 800 : 500}
                  sx={{
                    color: isActive ? '#635BFF' : '#7E8494',
                    borderBottom: isActive ? '2px solid #635BFF' : 'none',
                    pb: 0.5,
                    cursor: 'pointer',
                    '&:hover': { color: '#635BFF' },
                  }}
                  onClick={() => navigate(item.path)}
                >
                  {item.title}
                </Typography>
              );
            })}
          </Stack>

          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <IconButton sx={{ bgcolor: 'white', borderRadius: 3, boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <NotificationsNoneIcon sx={{ color: '#7E8494' }} />
            </IconButton>

            {/* Profile Avatar Button */}
            <Tooltip title="My Profile" arrow>
              <Avatar
                onClick={() => navigate('/profile')}
                sx={{
                  bgcolor: '#635BFF',
                  color: 'white',
                  fontWeight: 800,
                  width: 42,
                  height: 42,
                  borderRadius: 3,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  boxShadow: '0 4px 12px rgba(99, 91, 255, 0.25)',
                  '&:hover': {
                    transform: 'scale(1.06)',
                    bgcolor: '#534BE8',
                    boxShadow: '0 6px 18px rgba(99, 91, 255, 0.35)',
                  },
                }}
              >
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Tooltip>
          </Stack>
        </Box>

        {children}
      </Box>
    </Box>
  );
}

export default AppLayout;