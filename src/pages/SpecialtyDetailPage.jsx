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
  Divider,
  Stack,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import BuildIcon from '@mui/icons-material/BuildRounded';
import AssignmentIcon from '@mui/icons-material/AssignmentRounded';
import SchoolIcon from '@mui/icons-material/SchoolRounded';
import TrendingUpIcon from '@mui/icons-material/TrendingUpRounded';
import MapIcon from '@mui/icons-material/MapRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded';
import AppLayout from '../components/AppLayout';
import { getSpecialtyById, assignUserSpecialty, getUserSpecialty } from '../api/specialtyApi';

function SpecialtyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState(null);
  const [isCurrentTarget, setIsCurrentTarget] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSpecialtyById(id);
        setSpecialty(data);

        try {
          const userSpec = await getUserSpecialty();
          if (userSpec && userSpec.id === Number(id)) {
            setIsCurrentTarget(true);
          }
        } catch {
          
        }
      } catch (err) {
        console.error('Error fetching specialty details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSelectTarget = async () => {
    setSubmitting(true);
    try {
      await assignUserSpecialty(id);
      setIsCurrentTarget(true);
      setSuccessMsg('Specialty successfully set as your target career path!');
    } catch (err) {
      console.error('Error assigning specialty:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AppLayout activeTab="Specialties">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress sx={{ color: '#635BFF' }} />
        </Box>
      </AppLayout>
    );
  }

  if (!specialty) {
    return (
      <AppLayout activeTab="Specialties">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#FF6482', mb: 2 }}>
            Specialty Not Found
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/specialties')}
            sx={{ borderRadius: 3, borderColor: '#E2E5EE', color: '#635BFF', fontWeight: 700 }}
          >
            Back to Catalog
          </Button>
        </Box>
      </AppLayout>
    );
  }

  return (
    <AppLayout activeTab="Specialties">
      {/* Back Button */}
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/specialties')}
        sx={{
          mb: 2.5,
          color: '#7E8494',
          fontWeight: 700,
          '&:hover': { color: '#635BFF', bgcolor: 'transparent' },
        }}
      >
        Back to Specialties
      </Button>

      {successMsg && (
        <Alert
          severity="success"
          sx={{ mb: 3, borderRadius: 4, fontWeight: 600 }}
          onClose={() => setSuccessMsg('')}
        >
          {successMsg}
        </Alert>
      )}

      {/* Hero Specialty Banner */}
      <Paper
        sx={{
          p: { xs: 3, md: 4.5 },
          borderRadius: 6,
          mb: 4,
          bgcolor: '#635BFF',
          color: 'white',
          boxShadow: '0 12px 35px rgba(99, 91, 255, 0.25)',
        }}
      >
        <Chip
          label="SPECIALTY DETAILS"
          sx={{
            bgcolor: 'rgba(255,255,255,0.2)',
            color: 'white',
            fontWeight: 800,
            mb: 2,
            letterSpacing: 0.5,
          }}
        />

        <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 1.5 }}>
          {specialty.name}
        </Typography>

        <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 800, lineHeight: 1.6, mb: 3.5 }}>
          {specialty.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button
            variant="contained"
            size="large"
            disabled={submitting || isCurrentTarget}
            startIcon={isCurrentTarget ? <CheckCircleIcon /> : null}
            onClick={handleSelectTarget}
            sx={{
              borderRadius: 3.5,
              px: 3.5,
              py: 1.2,
              fontWeight: 800,
              bgcolor: isCurrentTarget ? '#00D097' : 'white',
              color: isCurrentTarget ? 'white' : '#635BFF',
              '&:hover': { bgcolor: isCurrentTarget ? '#00B885' : '#F4F3FF' },
            }}
          >
            {isCurrentTarget ? 'Target Specialty Selected ✓' : submitting ? 'Saving...' : 'Set as Target Specialty'}
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<MapIcon />}
            onClick={() => navigate(`/learning-paths/${specialty.id}`)}
            sx={{
              borderRadius: 3.5,
              px: 3.5,
              py: 1.2,
              color: 'white',
              borderColor: 'rgba(255,255,255,0.6)',
              fontWeight: 700,
              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
            }}
          >
            Explore Roadmap
          </Button>
        </Box>
      </Paper>

      {/* Info Breakdown Grid */}
      <Grid container spacing={3}>
        {/* Key Missions */}
        {specialty.missions && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: 3.5,
                borderRadius: 5,
                height: '100%',
                bgcolor: 'white',
                border: '1.5px solid #F0F2F7',
                boxShadow: '0 8px 25px rgba(100, 110, 140, 0.04)',
              }}
            >
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 3,
                    bgcolor: '#EDEDFE',
                    color: '#635BFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <AssignmentIcon fontSize="small" />
                </Box>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#1A1C24' }}>
                  Missions & Responsibilities
                </Typography>
              </Stack>

              <Divider sx={{ mb: 2.5, borderColor: '#F5F6FA' }} />

              <Typography variant="body2" sx={{ whiteSpace: 'pre-line', color: '#7E8494', lineHeight: 1.7 }}>
                {specialty.missions}
              </Typography>
            </Paper>
          </Grid>
        )}

        {/* Tools & Tech Stack */}
        {specialty.tools && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: 3.5,
                borderRadius: 5,
                height: '100%',
                bgcolor: 'white',
                border: '1.5px solid #F0F2F7',
                boxShadow: '0 8px 25px rgba(100, 110, 140, 0.04)',
              }}
            >
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 3,
                    bgcolor: '#E6FAF5',
                    color: '#00D097',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <BuildIcon fontSize="small" />
                </Box>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#1A1C24' }}>
                  Tools & Technologies
                </Typography>
              </Stack>

              <Divider sx={{ mb: 2.5, borderColor: '#F5F6FA' }} />

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {specialty.tools.split(',').map((tool, index) => (
                  <Chip
                    key={index}
                    label={tool.trim()}
                    sx={{
                      bgcolor: '#F5F6FA',
                      color: '#1A1C24',
                      fontWeight: 700,
                      borderRadius: 2.5,
                      px: 0.5,
                    }}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>
        )}

        {/* Prerequisites */}
        {specialty.prerequisites && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: 3.5,
                borderRadius: 5,
                height: '100%',
                bgcolor: 'white',
                border: '1.5px solid #F0F2F7',
                boxShadow: '0 8px 25px rgba(100, 110, 140, 0.04)',
              }}
            >
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 3,
                    bgcolor: '#FFF1F3',
                    color: '#FF6482',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SchoolIcon fontSize="small" />
                </Box>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#1A1C24' }}>
                  Prerequisites & Background
                </Typography>
              </Stack>

              <Divider sx={{ mb: 2.5, borderColor: '#F5F6FA' }} />

              <Typography variant="body2" sx={{ color: '#7E8494', lineHeight: 1.7 }}>
                {specialty.prerequisites}
              </Typography>
            </Paper>
          </Grid>
        )}

        {/* Market Outlook */}
        {specialty.outlook && (
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: 3.5,
                borderRadius: 5,
                height: '100%',
                bgcolor: 'white',
                border: '1.5px solid #F0F2F7',
                boxShadow: '0 8px 25px rgba(100, 110, 140, 0.04)',
              }}
            >
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 3,
                    bgcolor: '#FFF8E6',
                    color: '#FFB800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <TrendingUpIcon fontSize="small" />
                </Box>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#1A1C24' }}>
                  Career Outlook & Market Demand
                </Typography>
              </Stack>

              <Divider sx={{ mb: 2.5, borderColor: '#F5F6FA' }} />

              <Typography variant="body2" sx={{ color: '#7E8494', lineHeight: 1.7 }}>
                {specialty.outlook}
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </AppLayout>
  );
}

export default SpecialtyDetailPage;