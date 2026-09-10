import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  LinearProgress,
  Stack,
  Chip,
  Alert,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded';
import AppLayout from '../components/AppLayout';
import { DoodleBrain, DoodleQuiz } from '../components/DoodleIcons';
import {
  getQuestionnaire,
  startSession,
  submitAnswers,
} from '../api/assessmentApi';

function AssessmentPage() {
  const [questions, setQuestions] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const initTest = async () => {
      try {
        const questionnaire = await getQuestionnaire('RIASEC');
        const session = await startSession('RIASEC');

        setSessionId(session.id || session.sessionId || session);
        setQuestions(questionnaire.questions || questionnaire || []);
      } catch (err) {
        console.error('Error initializing assessment:', err);
        setError('Failed to start assessment session. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    initTest();
  }, []);

  const handleScoreSelect = (scoreValue) => {
    const currentQ = questions[currentIndex];
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: Number(scoreValue),
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');

    
    const formattedAnswers = Object.entries(answers).map(([questionId, score]) => ({
      questionId: Number(questionId),
      value: score,
    }));

    try {
      await submitAnswers(sessionId, formattedAnswers);
      
      navigate(`/assessment/results/${sessionId}`);
    } catch (err) {
      console.error('Error submitting answers:', err);
      setError('Failed to calculate your RIASEC profile. Please check your answers.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <AppLayout activeTab="RIASEC Test">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
          <CircularProgress sx={{ color: '#635BFF' }} />
        </Box>
      </AppLayout>
    );
  }

  if (error && questions.length === 0) {
    return (
      <AppLayout activeTab="RIASEC Test">
        <Paper sx={{ p: 4, borderRadius: 5, textAlign: 'center', bgcolor: 'white', border: '1.5px solid #F0F2F7', maxWidth: 500, mx: 'auto', mt: 4 }}>
          <Typography variant="body1" color="error" fontWeight="bold" gutterBottom>
            {error}
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={() => window.location.reload()}
            sx={{ mt: 1.5, bgcolor: '#635BFF', borderRadius: 2.5, fontWeight: 700 }}
          >
            Retry
          </Button>
        </Paper>
      </AppLayout>
    );
  }

  const currentQ = questions[currentIndex];
  
  
  const answeredCount = Object.keys(answers).length;
  const progressPercent = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;
  
  const isAnswered = answers[currentQ?.id] !== undefined;
  const isAllAnswered = questions.length > 0 && answeredCount === questions.length;
  const isLastQuestion = currentIndex === questions.length - 1;

  const ratingOptions = [
    { value: 1, label: 'Strongly Disagree' },
    { value: 2, label: 'Disagree' },
    { value: 3, label: 'Neutral' },
    { value: 4, label: 'Agree' },
    { value: 5, label: 'Strongly Agree' },
  ];

  return (
    <AppLayout activeTab="RIASEC Test">
      <Stack spacing={1.5} sx={{ width: '100%', maxWidth: 780, mx: 'auto' }}>
        {/* Compact Header */}
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
            <DoodleBrain sx={{ fontSize: 16, color: '#635BFF' }} />
            <Typography variant="caption" sx={{ color: '#635BFF', fontWeight: 800, fontSize: '0.72rem', letterSpacing: 0.4 }}>
              CAREER FIT TEST
            </Typography>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: '#1A1C24',
              fontSize: { xs: '1.35rem', md: '1.65rem' },
            }}
          >
            RIASEC Assessment{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(90deg, #635BFF 0%, #8F85FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Evaluation
            </Box>
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ py: 0.5, px: 2, borderRadius: 3, fontSize: '0.8rem' }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        {/* Compact Main Questionnaire Card */}
        <Paper
          sx={{
            p: 2.5,
            borderRadius: 4.5,
            bgcolor: 'white',
            border: '1.5px solid #F0F2F7',
            boxShadow: '0 6px 24px rgba(100, 110, 140, 0.04)',
          }}
        >
          {/* Progress Header */}
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
              <Chip
                icon={<DoodleQuiz sx={{ fontSize: '15px !important', color: '#635BFF !important' }} />}
                label={`Question ${currentIndex + 1} of ${questions.length}`}
                size="small"
                sx={{ bgcolor: '#EDEDFE', color: '#635BFF', fontWeight: 800, fontSize: '0.72rem', height: 24, borderRadius: 2 }}
              />
              <Typography variant="caption" fontWeight="800" sx={{ color: '#635BFF', fontSize: '0.75rem' }}>
                {progressPercent.toFixed(0)}% Completed
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progressPercent}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: '#F5F6FA',
                '& .MuiLinearProgress-bar': { bgcolor: '#635BFF', borderRadius: 3 },
              }}
            />
          </Box>

          {/* Question Prompt */}
          <Box sx={{ minHeight: 64, display: 'flex', flexDirection: 'column', justifyContent: 'center', mb: 2 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: '#1A1C24',
                lineHeight: 1.35,
                fontSize: { xs: '1rem', md: '1.15rem' },
                letterSpacing: '-0.01em',
              }}
            >
              {currentQ?.text || currentQ?.questionText}
            </Typography>
            {(currentQ?.dimension || currentQ?.riasecType) && (
              <Box sx={{ mt: 0.8 }}>
                <Chip
                  label={`Dimension: ${currentQ.dimension || currentQ.riasecType}`}
                  size="small"
                  sx={{ bgcolor: '#F5F6FA', color: '#7E8494', fontWeight: 700, fontSize: '0.68rem', height: 20 }}
                />
              </Box>
            )}
          </Box>

          {/* Rating Options */}
          <RadioGroup
            value={answers[currentQ?.id] || ''}
            onChange={(e) => handleScoreSelect(e.target.value)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2.5 }}
          >
            {ratingOptions.map((opt) => {
              const selected = answers[currentQ?.id] === opt.value;
              return (
                <Box
                  key={opt.value}
                  onClick={() => handleScoreSelect(opt.value)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                    py: 1,
                    borderRadius: 3,
                    border: selected ? '2px solid #635BFF' : '1.5px solid #F0F2F7',
                    bgcolor: selected ? '#F8F7FF' : '#FAFBFD',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      borderColor: '#635BFF',
                      bgcolor: '#FAF9FF',
                    },
                  }}
                >
                  <FormControlLabel
                    value={opt.value}
                    control={
                      <Radio
                        size="small"
                        sx={{
                          p: 0.5,
                          mr: 1,
                          color: '#D0D5DD',
                          '&.Mui-checked': { color: '#635BFF' },
                        }}
                      />
                    }
                    label={
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: selected ? 800 : 600,
                          color: selected ? '#1A1C24' : '#4A5060',
                          fontSize: '0.85rem',
                        }}
                      >
                        {opt.label}
                      </Typography>
                    }
                    sx={{ width: '100%', m: 0 }}
                  />
                </Box>
              );
            })}
          </RadioGroup>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 1.5, borderTop: '1px solid #F5F6FA' }}>
            <Button
              variant="text"
              size="small"
              startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
              disabled={currentIndex === 0}
              onClick={handlePrev}
              sx={{
                color: '#7E8494',
                fontWeight: 700,
                fontSize: '0.8rem',
                textTransform: 'none',
                '&:hover': { color: '#635BFF', bgcolor: 'transparent' },
              }}
            >
              Previous
            </Button>

            <Stack direction="row" spacing={1.5}>
              {!isLastQuestion ? (
                <Button
                  variant="contained"
                  size="small"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                  disabled={!isAnswered}
                  onClick={handleNext}
                  sx={{
                    bgcolor: '#635BFF',
                    fontWeight: 700,
                    borderRadius: 2.5,
                    px: 2.5,
                    py: 0.7,
                    fontSize: '0.82rem',
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(99, 91, 255, 0.25)',
                    '&:hover': { bgcolor: '#534BE8' },
                  }}
                >
                  Next Question
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  startIcon={<CheckCircleIcon sx={{ fontSize: 16 }} />}
                  disabled={!isAllAnswered || submitting}
                  onClick={handleSubmit}
                  sx={{
                    bgcolor: '#00D097',
                    fontWeight: 800,
                    borderRadius: 2.5,
                    px: 3,
                    py: 0.8,
                    fontSize: '0.82rem',
                    textTransform: 'none',
                    boxShadow: '0 4px 14px rgba(0, 208, 151, 0.25)',
                    '&:hover': { bgcolor: '#00B885' },
                  }}
                >
                  {submitting ? 'Submitting...' : 'Submit Assessment'}
                </Button>
              )}
            </Stack>
          </Box>
        </Paper>
      </Stack>
    </AppLayout>
  );
}

export default AssessmentPage;