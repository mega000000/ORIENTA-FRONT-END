import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Chip,
  LinearProgress,
  CircularProgress,
  Link,
  Stack,
  Alert,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded';
import AccessTimeIcon from '@mui/icons-material/AccessTimeRounded';
import MenuBookIcon from '@mui/icons-material/MenuBookRounded';
import OpenInNewIcon from '@mui/icons-material/OpenInNewRounded';
import SchoolIcon from '@mui/icons-material/SchoolRounded';
import AppLayout from '../components/AppLayout';
import { getLearningPathsBySpecialty } from '../api/learningPathApi';
import { startUserPath, completeUserStep } from '../api/gamificationApi';

function LearningPathPage() {
  const { specialtyId } = useParams();
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState(null);
  const [userPathId, setUserPathId] = useState(null);
  const [completedStepIds, setCompletedStepIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [earnedAlert, setEarnedAlert] = useState('');

  useEffect(() => {
    const fetchPathsAndInit = async () => {
      try {
        const data = await getLearningPathsBySpecialty(specialtyId);

        if (data && data.length > 0) {
          const currentPath = data[0];
          setSelectedPath(currentPath);

          try {
            const userPathResponse = await startUserPath(currentPath.id);
            if (userPathResponse) {
              setUserPathId(userPathResponse.id || userPathResponse.userPathId);

              if (userPathResponse.completedSteps) {
                const doneIds = new Set(userPathResponse.completedSteps.map((s) => s.id || s));
                setCompletedStepIds(doneIds);
              }
            }
          } catch (e) {
            console.warn('Could not initialize user-path on backend:', e);
          }
        }
      } catch (err) {
        console.error('Error fetching learning paths:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPathsAndInit();
  }, [specialtyId]);

  const handleStepComplete = async (stepId) => {
    if (!userPathId) {
      setCompletedStepIds((prev) => new Set(prev).add(stepId));
      return;
    }

    setActionLoading(true);
    try {
      const updatedUserPath = await completeUserStep(userPathId, stepId);
      setCompletedStepIds((prev) => new Set(prev).add(stepId));
      setEarnedAlert('Milestone completed! +XP added to your profile 🚀');

      if (updatedUserPath && updatedUserPath.completedSteps) {
        const doneIds = new Set(updatedUserPath.completedSteps.map((s) => s.id || s));
        setCompletedStepIds(doneIds);
      }
    } catch (err) {
      console.error('Error completing step on backend:', err);
      setCompletedStepIds((prev) => new Set(prev).add(stepId));
    } finally {
      setActionLoading(false);
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

  if (!selectedPath) {
    return (
      <AppLayout activeTab="Specialties">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Paper sx={{ p: 5, borderRadius: 6, maxWidth: 500, mx: 'auto', bgcolor: 'white', border: '1.5px solid #F0F2F7' }}>
            <SchoolIcon sx={{ fontSize: 48, color: '#7E8494', mb: 2 }} />
            <Typography variant="h6" fontWeight="bold" sx={{ color: '#1A1C24', mb: 1 }}>
              No Learning Path Found
            </Typography>
            <Typography variant="body2" sx={{ color: '#7E8494', mb: 3 }}>
              This specialty does not have an active learning path configured yet.
            </Typography>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate('/specialties')}
              sx={{ borderRadius: 3, borderColor: '#E2E5EE', color: '#635BFF', fontWeight: 700 }}
            >
              Back to Catalog
            </Button>
          </Paper>
        </Box>
      </AppLayout>
    );
  }

  const steps = selectedPath.steps || [];
  const completedCount = steps.filter((s) => completedStepIds.has(s.id)).length;
  const progressPercent = steps.length > 0 ? (completedCount / steps.length) * 100 : 0;

  return (
    <AppLayout activeTab="Specialties">
      {/* Back Button */}
      <Button
        variant="text"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{
          mb: 2.5,
          color: '#7E8494',
          fontWeight: 700,
          '&:hover': { color: '#635BFF', bgcolor: 'transparent' },
        }}
      >
        Back to Specialty
      </Button>

      {earnedAlert && (
        <Alert
          severity="success"
          sx={{ mb: 3, borderRadius: 4, fontWeight: 600 }}
          onClose={() => setEarnedAlert('')}
        >
          {earnedAlert}
        </Alert>
      )}

      {/* Hero Roadmap Banner */}
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
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
          <Chip
            label={selectedPath.level || 'Beginner'}
            sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 800, letterSpacing: 0.5 }}
          />
          <Chip
            icon={<AccessTimeIcon sx={{ color: 'white !important' }} />}
            label={`~${selectedPath.estimatedWeeks} Weeks`}
            sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 700 }}
          />
        </Stack>

        <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 1.5 }}>
          {selectedPath.title}
        </Typography>

        <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: 700, lineHeight: 1.6, mb: 3.5 }}>
          Follow this structured roadmap step-by-step to master key competencies and earn completion badges.
        </Typography>

        {/* Global Progress Bar */}
        <Box sx={{ maxWidth: 600, bgcolor: 'rgba(255,255,255,0.15)', p: 2.5, borderRadius: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              Milestone Progress: {completedCount} / {steps.length} Steps
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 900 }}>
              {progressPercent.toFixed(0)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: 'rgba(255,255,255,0.25)',
              '& .MuiLinearProgress-bar': { bgcolor: '#00D097' },
            }}
          />
        </Box>
      </Paper>

      {/* Stepper Roadmap Container */}
      <Paper
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 6,
          bgcolor: 'white',
          border: '1.5px solid #F0F2F7',
          boxShadow: '0 8px 30px rgba(100, 110, 140, 0.04)',
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#1A1C24', mb: 4 }}>
          Learning Steps & Curated Resources
        </Typography>

        <Stepper orientation="vertical" nonLinear>
          {steps.map((step) => {
            const isCompleted = completedStepIds.has(step.id);

            return (
              <Step key={step.id} active expanded completed={isCompleted}>
                <StepLabel
                  optional={
                    <Typography variant="caption" sx={{ color: '#7E8494', fontWeight: 600 }}>
                      {step.durationHours} Hours estimated workload
                    </Typography>
                  }
                  sx={{
                    '& .MuiStepLabel-label': {
                      fontWeight: 800,
                      fontSize: '1.05rem',
                      color: isCompleted ? '#00D097' : '#1A1C24',
                    },
                  }}
                >
                  {step.orderIndex}. {step.title}
                </StepLabel>

                <StepContent sx={{ borderLeft: '2px solid #F0F2F7', ml: 1.5, pl: 3, pb: 4 }}>
                  <Typography variant="body2" sx={{ color: '#7E8494', lineHeight: 1.6, mb: 2.5, maxWidth: 720 }}>
                    {step.objective}
                  </Typography>

                  {/* Curated Resources List */}
                  {step.resources && step.resources.length > 0 && (
                    <Box
                      sx={{
                        mb: 3,
                        p: 2.5,
                        bgcolor: '#F9FAFD',
                        borderRadius: 4,
                        border: '1px solid #F0F2F7',
                        maxWidth: 720,
                      }}
                    >
                      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.5 }}>
                        <MenuBookIcon sx={{ fontSize: 18, color: '#635BFF' }} />
                        <Typography variant="caption" sx={{ fontWeight: 800, color: '#635BFF', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                          Recommended Material:
                        </Typography>
                      </Stack>

                      <Stack spacing={1.2}>
                        {step.resources.map((res) => (
                          <Box key={res.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                            <Chip
                              label={res.type}
                              size="small"
                              sx={{ bgcolor: '#EDEDFE', color: '#635BFF', fontWeight: 700, borderRadius: 2 }}
                            />
                            <Link
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              underline="hover"
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 0.5,
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: '#1A1C24',
                                '&:hover': { color: '#635BFF' },
                              }}
                            >
                              {res.title} ({res.provider})
                              <OpenInNewIcon sx={{ fontSize: 14 }} />
                            </Link>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  )}

                  {/* Completion Action */}
                  <Button
                    variant="contained"
                    disabled={actionLoading || isCompleted}
                    startIcon={isCompleted ? <CheckCircleIcon /> : null}
                    onClick={() => handleStepComplete(step.id)}
                    sx={{
                      borderRadius: 3,
                      px: 3,
                      py: 1,
                      fontWeight: 800,
                      textTransform: 'none',
                      bgcolor: isCompleted ? '#00D097' : '#635BFF',
                      '&:hover': { bgcolor: isCompleted ? '#00B885' : '#534BE8' },
                    }}
                  >
                    {isCompleted ? 'Completed ✓' : 'Mark as Done (+XP)'}
                  </Button>

                  <Divider sx={{ mt: 3, borderColor: '#F5F6FA' }} />
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
      </Paper>
    </AppLayout>
  );
}

export default LearningPathPage;