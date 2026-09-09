import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  Grid,
  Paper,
  keyframes,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import {
  DoodleQuiz,
  DoodleGraduation,
  DoodleTrophy,
  DoodleBrain,
  DoodleExplore,
} from '../components/DoodleIcons';

// 3D Floating Animations
const floatSlow = keyframes`
  0%, 100% {
    transform: translateY(0px) rotateX(10deg) rotateY(-12deg) rotateZ(-4deg);
  }
  50% {
    transform: translateY(-14px) rotateX(4deg) rotateY(-6deg) rotateZ(-1deg);
  }
`;

const floatMedium = keyframes`
  0%, 100% {
    transform: translateY(0px) rotateX(-8deg) rotateY(14deg) rotateZ(3deg);
  }
  50% {
    transform: translateY(-18px) rotateX(-2deg) rotateY(8deg) rotateZ(6deg);
  }
`;

const floatPulse = keyframes`
  0%, 100% {
    transform: translateY(0px) rotate(-2deg) scale(1);
  }
  50% {
    transform: translateY(-10px) rotate(1deg) scale(1.02);
  }
`;

const badgePulse = keyframes`
  0%, 100% {
    box-shadow: 0 10px 30px rgba(99, 91, 255, 0.25), 0 20px 50px rgba(0,0,0,0.06);
    transform: translateY(0);
  }
  50% {
    box-shadow: 0 15px 40px rgba(99, 91, 255, 0.35), 0 25px 60px rgba(0,0,0,0.08);
    transform: translateY(-8px);
  }
`;

function LandingPage() {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Features', action: () => scrollToSection('features-section') },
    { label: 'Methodology', action: () => scrollToSection('methodology-section') },
    { label: 'Specialties', action: () => navigate('/specialties') },
    { label: 'Gamification', action: () => scrollToSection('gamification-section') },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        bgcolor: '#FBFBFE',
        color: '#1A1C24',
        position: 'relative',
        overflowX: 'hidden',
        backgroundImage: 'radial-gradient(#E2E5EE 1.3px, transparent 1.3px)',
        backgroundSize: '24px 24px',
        perspective: '1200px',
      }}
    >
      {/* 1. Navbar */}
      <Box
        component="nav"
        sx={{
          px: { xs: 3, md: 8 },
          py: 2.2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          bgcolor: 'rgba(251, 251, 254, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(240, 242, 247, 0.8)',
          zIndex: 1000,
        }}
      >
        {/* Brand Logo */}
        <Stack
          direction="row"
          spacing={1.2}
          alignItems="center"
          sx={{ cursor: 'pointer' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 3,
              bgcolor: '#635BFF',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '1.1rem',
              boxShadow: '0 8px 20px rgba(99, 91, 255, 0.35)',
            }}
          >
            O+
          </Box>
          <Typography sx={{ fontWeight: 900, fontSize: '1.25rem', color: '#1A1C24', letterSpacing: '-0.03em' }}>
            ORIENTA<Box component="span" sx={{ color: '#635BFF' }}>+</Box>
          </Typography>
        </Stack>

        {/* Center Nav Buttons */}
        <Stack direction="row" spacing={3.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
          {navLinks.map((item) => (
            <Typography
              key={item.label}
              onClick={item.action}
              sx={{
                fontSize: '0.88rem',
                fontWeight: 600,
                color: '#6B7280',
                cursor: 'pointer',
                transition: 'color 0.15s ease, transform 0.15s ease',
                '&:hover': { color: '#635BFF', transform: 'translateY(-1px)' },
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Stack>

        {/* Action Buttons */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Button
            variant="text"
            onClick={() => navigate('/login')}
            sx={{
              color: '#1A1C24',
              fontWeight: 700,
              fontSize: '0.88rem',
              textTransform: 'none',
              px: 2,
              '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
            }}
          >
            Sign in
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/register')}
            sx={{
              bgcolor: '#635BFF',
              color: 'white',
              fontWeight: 800,
              fontSize: '0.86rem',
              textTransform: 'none',
              borderRadius: 3,
              px: 2.8,
              py: 0.9,
              boxShadow: '0 8px 20px rgba(99, 91, 255, 0.28)',
              '&:hover': { bgcolor: '#534BE8' },
            }}
          >
            Get Started
          </Button>
        </Stack>
      </Box>

      {/* 2. Hero Section with 3D Floating Badges */}
      <Box sx={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Floating Note 1 */}
        <Box
          sx={{
            position: 'absolute',
            top: '12%',
            left: '4%',
            width: 210,
            p: 2,
            bgcolor: '#FFF8CE',
            borderRadius: 4,
            boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
            border: '1px solid rgba(220, 205, 120, 0.4)',
            animation: `${floatPulse} 7s ease-in-out infinite`,
            display: { xs: 'none', lg: 'block' },
            zIndex: 5,
          }}
        >
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#E11D48', mx: 'auto', mb: 1 }} />
          <Typography sx={{ fontSize: '0.78rem', fontFamily: 'sans-serif', color: '#713F12', lineHeight: 1.4, fontWeight: 700 }}>
            Discover your RIASEC profile, unlock tech tracks, and level up your orientation!
          </Typography>
        </Box>

        {/* Floating Card 2 */}
        <Box
          sx={{
            position: 'absolute',
            top: '14%',
            right: '5%',
            width: 220,
            p: 2,
            bgcolor: 'white',
            borderRadius: 4.5,
            boxShadow: '0 25px 50px rgba(100, 110, 140, 0.08)',
            border: '1.5px solid #F0F2F7',
            animation: `${floatSlow} 8s ease-in-out infinite`,
            display: { xs: 'none', lg: 'block' },
            zIndex: 5,
          }}
        >
          <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1 }}>
            <Box sx={{ width: 30, height: 30, borderRadius: 2, bgcolor: '#EDEDFE', color: '#635BFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DoodleBrain sx={{ fontSize: 18 }} />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 800, fontSize: '0.78rem', color: '#1A1C24' }}>Holland Match</Typography>
              <Typography sx={{ fontSize: '0.62rem', color: '#8A90A2' }}>Psychometric Fit</Typography>
            </Box>
          </Stack>
          <Box sx={{ p: 0.8, borderRadius: 2, bgcolor: '#FAFBFD', border: '1px solid #F0F2F7' }}>
            <Typography sx={{ fontWeight: 800, fontSize: '0.74rem', color: '#00D097' }}>96.4% Match Fit</Typography>
            <Typography sx={{ fontSize: '0.66rem', color: '#7E8494' }}>Full Stack Development</Typography>
          </Box>
        </Box>

        {/* Center Hero Content */}
        <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center', px: 3, py: 6, zIndex: 10 }}>
          <Box
            sx={{
              width: 54,
              height: 54,
              borderRadius: 3.5,
              bgcolor: 'white',
              border: '2px solid #F0F2F7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              animation: `${badgePulse} 4s ease-in-out infinite`,
            }}
          >
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0.6 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#635BFF' }} />
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#00D097' }} />
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#1A1C24' }} />
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#FFB800' }} />
            </Box>
          </Box>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.4rem', sm: '3.4rem', md: '4.2rem' },
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.035em',
              color: '#111318',
              mb: 2.5,
            }}
          >
            Discover, align, and track{' '}
            <Box component="span" sx={{ color: '#8A90A2', fontWeight: 500 }}>
              your career path
            </Box>
          </Typography>

          <Typography sx={{ fontSize: { xs: '0.95rem', md: '1.15rem' }, color: '#6B7280', maxWidth: 540, mx: 'auto', lineHeight: 1.6, mb: 4 }}>
            Empowering tech students with psychometric RIASEC assessment, tailored roadmaps, and gamified progress tracking.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
              sx={{
                bgcolor: '#635BFF',
                fontWeight: 800,
                borderRadius: 3.5,
                px: 3.8,
                py: 1.4,
                boxShadow: '0 12px 30px rgba(99, 91, 255, 0.3)',
                '&:hover': { bgcolor: '#534BE8' },
              }}
            >
              Start Free Assessment
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/specialties')}
              sx={{
                bgcolor: 'white',
                borderColor: '#E2E5EE',
                color: '#1A1C24',
                fontWeight: 700,
                borderRadius: 3.5,
                px: 3.5,
                py: 1.4,
                '&:hover': { bgcolor: '#FAFBFD', borderColor: '#635BFF' },
              }}
            >
              Explore Specialties
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* 3. Section: Features (Anchor: features-section) */}
      <Box id="features-section" sx={{ maxWidth: 1100, mx: 'auto', px: 3, py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Chip label="CORE CAPABILITIES" size="small" sx={{ bgcolor: '#EDEDFE', color: '#635BFF', fontWeight: 800, mb: 1 }} />
          <Typography variant="h4" fontWeight="800" letterSpacing="-0.02em">
            Everything you need to master your orientation
          </Typography>
        </Box>

        <Grid container spacing={2.5}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, borderRadius: 4, bgcolor: 'white', border: '1.5px solid #F0F2F7', boxShadow: '0 4px 18px rgba(100, 110, 140, 0.03)' }}>
              <Box sx={{ width: 44, height: 44, borderRadius: 2.5, bgcolor: '#EDEDFE', color: '#635BFF', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <DoodleBrain sx={{ fontSize: 22 }} />
              </Box>
              <Typography variant="h6" fontWeight="800" sx={{ mb: 1, fontSize: '1.05rem' }}>Scientific RIASEC Test</Typography>
              <Typography variant="body2" sx={{ color: '#7E8494', lineHeight: 1.5 }}>
                Identify your Holland personality type through calibrated questions to match software engineering profiles accurately.
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, borderRadius: 4, bgcolor: 'white', border: '1.5px solid #F0F2F7', boxShadow: '0 4px 18px rgba(100, 110, 140, 0.03)' }}>
              <Box sx={{ width: 44, height: 44, borderRadius: 2.5, bgcolor: '#E6FAF5', color: '#00D097', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <DoodleExplore sx={{ fontSize: 22 }} />
              </Box>
              <Typography variant="h6" fontWeight="800" sx={{ mb: 1, fontSize: '1.05rem' }}>Tailored Roadmaps</Typography>
              <Typography variant="body2" sx={{ color: '#7E8494', lineHeight: 1.5 }}>
                Dynamic step-by-step milestones built specifically around your target tech stack and career requirements.
              </Typography>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, borderRadius: 4, bgcolor: 'white', border: '1.5px solid #F0F2F7', boxShadow: '0 4px 18px rgba(100, 110, 140, 0.03)' }}>
              <Box sx={{ width: 44, height: 44, borderRadius: 2.5, bgcolor: '#FFF1F3', color: '#FF4D73', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <DoodleTrophy sx={{ fontSize: 22 }} />
              </Box>
              <Typography variant="h6" fontWeight="800" sx={{ mb: 1, fontSize: '1.05rem' }}>Career Gamification</Typography>
              <Typography variant="body2" sx={{ color: '#7E8494', lineHeight: 1.5 }}>
                Earn experience points (XP), advance your rank tiers, and collect badges as you complete orientation steps.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* 4. Section: Methodology (Anchor: methodology-section) */}
      <Box id="methodology-section" sx={{ maxWidth: 900, mx: 'auto', px: 3, py: 8 }}>
        <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 5, bgcolor: 'white', border: '1.5px solid #F0F2F7', boxShadow: '0 8px 30px rgba(100,110,140,0.04)' }}>
          <Chip label="THE HOLLAND MODEL" size="small" sx={{ bgcolor: '#FAFBFD', border: '1px solid #F0F2F7', color: '#635BFF', fontWeight: 800, mb: 1.5 }} />
          <Typography variant="h4" fontWeight="800" sx={{ mb: 2, letterSpacing: '-0.02em' }}>
            Rooted in Validated Behavioral Science
          </Typography>
          <Typography variant="body1" sx={{ color: '#7E8494', lineHeight: 1.6, mb: 3 }}>
            ORIENTA+ utilizes Dr. John Holland&apos;s RIASEC model to evaluate your preferences across Realistic, Investigative, Artistic, Social, Enterprising, and Conventional dimensions, aligning them directly with modern tech careers.
          </Typography>
          <Stack spacing={1.2}>
            {['Algorithmic compatibility percentage calculation', 'Direct cross-matching with tech specialty toolsets', 'Actionable progression from exploration to career mastery'].map((point, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                <CheckCircleOutlineRoundedIcon sx={{ color: '#00D097', fontSize: 20 }} />
                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#1A1C24' }}>{point}</Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Box>

      {/* 5. Section: Gamification (Anchor: gamification-section) */}
      <Box id="gamification-section" sx={{ maxWidth: 1100, mx: 'auto', px: 3, py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Chip label="PROGRESSION SYSTEM" size="small" sx={{ bgcolor: '#FFF7E6', color: '#FFB800', fontWeight: 800, mb: 1 }} />
          <Typography variant="h4" fontWeight="800" letterSpacing="-0.02em">
            Turn your orientation into a rewarding journey
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {[{ lvl: 'Level 1', name: 'Découverte', desc: 'Complete your first questionnaire' }, { lvl: 'Level 2', name: 'Exploration', desc: 'Select your target specialty' }, { lvl: 'Level 3', name: 'Orientation', desc: 'Unlock roadmap milestones' }].map((tier, idx) => (
            <Grid key={idx} size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 2.5, borderRadius: 4, bgcolor: 'white', border: '1.5px solid #F0F2F7', textAlign: 'center' }}>
                <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#EDEDFE', color: '#635BFF', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 1.5 }}>
                  {idx + 1}
                </Box>
                <Typography variant="subtitle1" fontWeight="800">{tier.name}</Typography>
                <Typography variant="caption" sx={{ color: '#635BFF', fontWeight: 800, display: 'block', mb: 0.5 }}>{tier.lvl}</Typography>
                <Typography variant="body2" sx={{ color: '#7E8494', fontSize: '0.8rem' }}>{tier.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* 6. Footer */}
      <Box
        sx={{
          px: { xs: 3, md: 8 },
          py: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #F0F2F7',
          bgcolor: 'white',
        }}
      >
        <Typography variant="caption" sx={{ color: '#8A90A2', fontWeight: 600 }}>
          © 2026 ORIENTA+. Modern Career Orientation System.
        </Typography>
        <Stack direction="row" spacing={3}>
          <Typography variant="caption" onClick={() => scrollToSection('features-section')} sx={{ color: '#8A90A2', fontWeight: 600, cursor: 'pointer', '&:hover': { color: '#635BFF' } }}>
            Features
          </Typography>
          <Typography variant="caption" onClick={() => navigate('/specialties')} sx={{ color: '#8A90A2', fontWeight: 600, cursor: 'pointer', '&:hover': { color: '#635BFF' } }}>
            Specialties
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default LandingPage;