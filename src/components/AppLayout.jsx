import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {
  DoodleDashboard,
  DoodleQuiz,
  DoodleExplore,
  DoodleRecommend,
  DoodleProfile,
} from './DoodleIcons';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: DoodleDashboard },
  { label: 'RIASEC Test', path: '/assessment', icon: DoodleQuiz },
  { label: 'Specialties', path: '/specialties', icon: DoodleExplore },
  { label: 'Recommendations', path: '/recommendations', icon: DoodleRecommend },
  { label: 'Profile', path: '/profile', icon: DoodleProfile },
];

function AppLayout({ children, activeTab }) {
  const navigate = useNavigate();
  const location = useLocation();

  const fullName = localStorage.getItem('fullName') || 'Student';
  const firstLetter = fullName.trim().charAt(0).toUpperCase() || 'S';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    navigate('/'); // 🌟 يرجع مباشرة للصفحة العامة الرئيسية
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        bgcolor: '#FBFBFE',
        backgroundImage: 'radial-gradient(#E2E5EE 1.3px, transparent 1.3px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* 1. Left Vertical Sidebar */}
      <Box
        component="aside"
        sx={{
          width: 76,
          bgcolor: '#544BF0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2.5,
          flexShrink: 0,
          zIndex: 1200,
          boxShadow: '4px 0 24px rgba(84, 75, 240, 0.15)',
        }}
      >
        {/* Logo O+ */}
        <Box
          onClick={() => navigate('/dashboard')}
          sx={{
            width: 44,
            height: 44,
            borderRadius: 3.5,
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 900,
            fontSize: '1.2rem',
            cursor: 'pointer',
            transition: 'transform 0.15s ease',
            '&:hover': { transform: 'scale(1.05)' },
          }}
        >
          O+
        </Box>

        {/* Sidebar Nav Icons */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, alignItems: 'center' }}>
          {NAV_ITEMS.map((item) => {
            const IconComponent = item.icon;
            const isActive =
              location.pathname === item.path ||
              (item.label === 'Dashboard' && location.pathname === '/') ||
              activeTab === item.label;

            return (
              <Tooltip key={item.path} title={item.label} placement="right" arrow>
                <Box
                  onClick={() => navigate(item.path)}
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    bgcolor: isActive ? 'white' : 'transparent',
                    color: isActive ? '#544BF0' : 'rgba(255, 255, 255, 0.75)',
                    boxShadow: isActive ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: isActive ? 'white' : 'rgba(255, 255, 255, 0.15)',
                      color: isActive ? '#544BF0' : 'white',
                    },
                  }}
                >
                  <IconComponent sx={{ fontSize: 22 }} />
                </Box>
              </Tooltip>
            );
          })}
        </Box>

        {/* Logout Action */}
        <Tooltip title="Logout" placement="right" arrow>
          <IconButton
            onClick={handleLogout}
            sx={{
              color: 'rgba(255, 255, 255, 0.75)',
              '&:hover': { color: '#FF708D', bgcolor: 'rgba(255, 255, 255, 0.1)' },
            }}
          >
            <LogoutRoundedIcon sx={{ fontSize: 22 }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* 2. Main Page Layout */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          minWidth: 0,
        }}
      >
        {/* Top Header Bar */}
        <Box
          component="header"
          sx={{
            height: 64,
            px: 3.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderBottom: '1px solid rgba(240, 242, 247, 0.8)',
            bgcolor: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            zIndex: 1100,
          }}
        >
          {/* Nav Links */}
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            {NAV_ITEMS.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.label === 'Dashboard' && location.pathname === '/') ||
                activeTab === item.label;

              return (
                <Box
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  sx={{
                    cursor: 'pointer',
                    py: 1,
                    position: 'relative',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.86rem',
                      fontWeight: isActive ? 800 : 600,
                      color: isActive ? '#544BF0' : '#7E8494',
                      transition: 'color 0.15s ease',
                      '&:hover': { color: '#544BF0' },
                    }}
                  >
                    {item.label}
                  </Typography>

                  {isActive && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: -10,
                        left: 0,
                        right: 0,
                        height: 3,
                        bgcolor: '#544BF0',
                        borderRadius: 2,
                      }}
                    />
                  )}
                </Box>
              );
            })}
          </Box>

          {/* Right Header Controls */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton
              size="small"
              sx={{
                width: 38,
                height: 38,
                borderRadius: 2.5,
                bgcolor: 'white',
                border: '1.5px solid #F0F2F7',
                color: '#7E8494',
                '&:hover': { bgcolor: '#F0F2F7' },
              }}
            >
              <NotificationsNoneRoundedIcon sx={{ fontSize: 20 }} />
            </IconButton>

            <Tooltip title="View Profile" arrow>
              <Avatar
                onClick={() => navigate('/profile')}
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: 2.5,
                  bgcolor: '#544BF0',
                  color: 'white',
                  fontWeight: 900,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(84, 75, 240, 0.3)',
                  transition: 'transform 0.15s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                {firstLetter}
              </Avatar>
            </Tooltip>
          </Box>
        </Box>

        {/* 3. Scrollable Viewport */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            p: { xs: 2, md: 3 },
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-track': { background: 'transparent' },
            '&::-webkit-scrollbar-thumb': { background: '#D9DCE5', borderRadius: '6px' },
            '&::-webkit-scrollbar-thumb:hover': { background: '#544BF0' },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default AppLayout;