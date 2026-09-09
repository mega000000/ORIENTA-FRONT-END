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
import QuizIcon from '@mui/icons-material/QuizRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackIcon from '@mui/icons-material/ArrowBackRounded';
import CheckCircleIcon from '@mui/icons-material/CheckCircleRounded';
import AppLayout from '../components/AppLayout';
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
        // جلب أسئلة اختبار RIASEC وبدء الجلسة
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
      score,
    }));

    try {
      await submitAnswers(sessionId, formattedAnswers);
      // الانتقال لصفحة النتائج أولاً لعرض كود RIASEC
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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress sx={{ color: '#635BFF' }} />
        </Box>
      </AppLayout>
    );
  }

  if (error && questions.length === 0) {
    return (
      <AppLayout activeTab="RIASEC Test">
        <Paper sx={{ p: 5, borderRadius: 6, textAlign: 'center', bgcolor: 'white', border: '1.5px solid #F0F2F7' }}>
          <Typography variant="h6" color="error" gutterBottom>
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{ mt: 2, bgcolor: '#635BFF', borderRadius: 3, fontWeight: 700 }}
          >
            Retry
          </Button>
        </Paper>
      </AppLayout>
    );
  }

  const currentQ = questions[currentIndex];
  const progressPercent = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const isAnswered = answers[currentQ?.id] !== undefined;
  const isAllAnswered = questions.length > 0 && questions.every((q) => answers[q.id] !== undefined);
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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1A1C24', mb: 1 }}>
          RIASEC Assessment Test 🧠
        </Typography>
        <Typography variant="body2" sx={{ color: '#7E8494' }}>
          Answer honestly to discover your Holland personality profile and best career orientation matches.
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 4 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <Paper
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 6,
          bgcolor: 'white',
          border: '1.5px solid #F0F2F7',
          boxShadow: '0 12px 35px rgba(100, 110, 140, 0.05)',
          maxWidth: 820,
          mx: 'auto',
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
            <Chip
              icon={<QuizIcon sx={{ color: '#635BFF !important' }} />}
              label={`Question ${currentIndex + 1} of ${questions.length}`}
              sx={{ bgcolor: '#EDEDFE', color: '#635BFF', fontWeight: 800, borderRadius: 3 }}
            />
            <Typography variant="caption" fontWeight="800" sx={{ color: '#635BFF' }}>
              {progressPercent.toFixed(0)}% Completed
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: '#F5F6FA',
              '& .MuiLinearProgress-bar': { bgcolor: '#635BFF' },
            }}
          />
        </Box>

        <Box sx={{ minHeight: 90, mb: 4 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: '#1A1C24',
              lineHeight: 1.4,
              letterSpacing: '-0.01em',
            }}
          >
            {currentQ?.text || currentQ?.questionText}
          </Typography>
          {(currentQ?.dimension || currentQ?.riasecType) && (
            <Chip
              label={`Profile Dimension: ${currentQ.dimension || currentQ.riasecType}`}
              size="small"
              sx={{ mt: 1.5, bgcolor: '#F5F6FA', color: '#7E8494', fontWeight: 700 }}
            />
          )}
        </Box>

        <RadioGroup
          value={answers[currentQ?.id] || ''}
          onChange={(e) => handleScoreSelect(e.target.value)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 5 }}
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
                  px: 3,
                  py: 1.5,
                  borderRadius: 4,
                  border: selected ? '2px solid #635BFF' : '1.5px solid #F0F2F7',
                  bgcolor: selected ? '#F6F5FF' : 'white',
                  cursor: 'pointer',
                  transition: '0.2s',
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
                      sx={{
                        color: '#D0D5DD',
                        '&.Mui-checked': { color: '#635BFF' },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: selected ? 800 : 600,
                        color: selected ? '#1A1C24' : '#4A5060',
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 2, borderTop: '1px solid #F5F6FA' }}>
          <Button
            variant="text"
            startIcon={<ArrowBackIcon />}
            disabled={currentIndex === 0}
            onClick={handlePrev}
            sx={{
              color: '#7E8494',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { color: '#635BFF', bgcolor: 'transparent' },
            }}
          >
            Previous
          </Button>

          <Stack direction="row" spacing={2}>
            {!isLastQuestion ? (
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                disabled={!isAnswered}
                onClick={handleNext}
                sx={{
                  bgcolor: '#635BFF',
                  fontWeight: 700,
                  borderRadius: 3.5,
                  px: 3.5,
                  py: 1.1,
                  textTransform: 'none',
                  '&:hover': { bgcolor: '#534BE8' },
                }}
              >
                Next Question
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircleIcon />}
                disabled={!isAllAnswered || submitting}
                onClick={handleSubmit}
                sx={{
                  bgcolor: '#00D097',
                  fontWeight: 800,
                  borderRadius: 3.5,
                  px: 4,
                  py: 1.2,
                  textTransform: 'none',
                  boxShadow: '0 8px 20px rgba(0, 208, 151, 0.25)',
                  '&:hover': { bgcolor: '#00B885' },
                }}
              >
                {submitting ? 'Calculating Profile...' : 'Submit Assessment'}
              </Button>
            )}
          </Stack>
        </Box>
      </Paper>
    </AppLayout>
  );
}

export default AssessmentPage;