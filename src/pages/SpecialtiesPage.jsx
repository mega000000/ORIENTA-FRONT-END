import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  CircularProgress,
  Button,
  Chip,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/SearchRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded';
import AppLayout from '../components/AppLayout';
import { DoodleExplore, DoodleGraduation } from '../components/DoodleIcons';
import { getAllSpecialties, searchSpecialties } from '../api/specialtyApi';

function SpecialtiesPage() {
  const [specialties, setSpecialties] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchSpecialties = async (search = '') => {
    setLoading(true);
    try {
      const data = search ? await searchSpecialties(search) : await getAllSpecialties();
      setSpecialties(data || []);
    } catch (err) {
      console.error('Error fetching specialties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSpecialties(keyword);
  };

  return (
    <AppLayout activeTab="Specialties">
      <Stack spacing={2.5} sx={{ width: '100%', maxWidth: 1200, mx: 'auto' }}>
        {/* Compact Header & Integrated Search Bar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
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
              <DoodleExplore sx={{ fontSize: 16, color: '#635BFF' }} />
              <Typography variant="caption" sx={{ color: '#635BFF', fontWeight: 800, fontSize: '0.72rem', letterSpacing: 0.4 }}>
                CAREER CATALOG
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
              Career{' '}
              <Box
                component="span"
                sx={{
                  background: 'linear-gradient(90deg, #635BFF 0%, #8F85FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Specialties
              </Box>
            </Typography>
          </Box>

          {/* Search Bar */}
          <Paper
            component="form"
            onSubmit={handleSearch}
            sx={{
              p: '4px 12px',
              display: 'flex',
              alignItems: 'center',
              width: { xs: '100%', sm: 340 },
              borderRadius: 3.5,
              bgcolor: 'white',
              boxShadow: '0 4px 16px rgba(100, 110, 140, 0.04)',
              border: '1.5px solid #F0F2F7',
            }}
          >
            <TextField
              fullWidth
              placeholder="Search specialties or tech..."
              variant="standard"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: '0.84rem' },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#8A90A2', fontSize: 18, mr: 0.5 }} />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{
                borderRadius: 2.5,
                px: 2,
                py: 0.5,
                bgcolor: '#635BFF',
                fontWeight: 700,
                fontSize: '0.78rem',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': { bgcolor: '#534BE8' },
              }}
            >
              Search
            </Button>
          </Paper>
        </Box>

        {/* Content Area */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '55vh' }}>
            <CircularProgress sx={{ color: '#635BFF' }} />
          </Box>
        ) : specialties.length === 0 ? (
          <Paper
            sx={{
              p: 5,
              textAlign: 'center',
              borderRadius: 4.5,
              bgcolor: 'white',
              border: '1.5px solid #F0F2F7',
              boxShadow: 'none',
            }}
          >
            <Typography variant="body1" fontWeight="700" color="text.secondary">
              No specialties matched your search query.
            </Typography>
          </Paper>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 2,
              width: '100%',
            }}
          >
            {specialties.map((spec) => (
              <Card
                key={spec.id}
                sx={{
                  borderRadius: 4.5,
                  p: 2,
                  minHeight: 250,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1.5px solid #F0F2F7',
                  bgcolor: 'white',
                  boxShadow: '0 4px 20px rgba(100, 110, 140, 0.03)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    borderColor: '#635BFF',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 30px rgba(99, 91, 255, 0.12)',
                    '& .card-action-btn': {
                      bgcolor: '#635BFF',
                      color: 'white',
                      borderColor: '#635BFF',
                      boxShadow: '0 4px 12px rgba(99, 91, 255, 0.25)',
                      '& .btn-arrow': {
                        transform: 'translateX(3px)',
                      },
                    },
                    '& .card-icon-box': {
                      bgcolor: '#635BFF',
                      color: 'white',
                      transform: 'scale(1.05)',
                    },
                  },
                }}
              >
                <CardContent sx={{ p: 0.5, '&:last-child': { pb: 0.5 } }}>
                  {/* Top Bar: Icon Box + Category Badge */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.8 }}>
                    <Box
                      className="card-icon-box"
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 3,
                        bgcolor: '#EDEDFE',
                        color: '#635BFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      <DoodleGraduation sx={{ fontSize: 22 }} />
                    </Box>

                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.6,
                        px: 1.2,
                        py: 0.4,
                        borderRadius: 2,
                        bgcolor: '#FAFBFD',
                        border: '1.2px solid #F0F2F7',
                      }}
                    >
                      <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: '#00D097' }} />
                      <Typography sx={{ color: '#7E8494', fontWeight: 800, fontSize: '0.68rem', letterSpacing: 0.2 }}>
                        TECH TRACK
                      </Typography>
                    </Box>
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: '#1A1C24',
                      fontSize: '1.02rem',
                      lineHeight: 1.3,
                      mb: 0.8,
                      letterSpacing: '-0.015em',
                    }}
                  >
                    {spec.name}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#7E8494',
                      fontSize: '0.82rem',
                      lineHeight: 1.5,
                      mb: 2,
                      minHeight: 40,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {spec.description}
                  </Typography>

                  {/* Tools / Tech Badges */}
                  {spec.tools && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 1 }}>
                      {spec.tools.split(',').slice(0, 3).map((tool, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.6,
                            px: 1,
                            py: 0.35,
                            borderRadius: 2,
                            bgcolor: '#FAFBFD',
                            border: '1px solid #ECEEF3',
                          }}
                        >
                          <Typography sx={{ color: '#3A4050', fontSize: '0.72rem', fontWeight: 700 }}>
                            {tool.trim()}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </CardContent>

                {/* Bottom Action Button */}
                <Box sx={{ pt: 1.5 }}>
                  <Button
                    fullWidth
                    className="card-action-btn"
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/specialties/${spec.id}`)}
                    sx={{
                      borderRadius: 2.8,
                      borderColor: '#E2E5EE',
                      color: '#635BFF',
                      bgcolor: '#FBFBFE',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      py: 0.8,
                      textTransform: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.8, width: '100%' }}>
                      <span>View Details</span>
                      <ArrowForwardIcon className="btn-arrow" sx={{ fontSize: 16, transition: 'transform 0.2s ease' }} />
                    </Box>
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
        )}
      </Stack>
    </AppLayout>
  );
}

export default SpecialtiesPage;