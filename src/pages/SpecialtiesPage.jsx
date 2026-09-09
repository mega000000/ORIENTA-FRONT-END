import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  CircularProgress,
  Button,
  Chip,
  Card,
  CardContent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/SearchRounded';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded';
import SchoolIcon from '@mui/icons-material/SchoolRounded';
import AppLayout from '../components/AppLayout';
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
      {/* Title & Search Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1A1C24', mb: 1 }}>
          Career Specialties 🧭
        </Typography>
        <Typography variant="body2" sx={{ color: '#7E8494', mb: 3 }}>
          Explore all tech paths, missions, required tools, and available roadmaps.
        </Typography>

        {/* Search Bar matching the modern rounded style */}
        <Paper
          component="form"
          onSubmit={handleSearch}
          sx={{
            p: '4px 16px',
            display: 'flex',
            alignItems: 'center',
            maxWidth: 540,
            borderRadius: 4,
            boxShadow: '0 8px 24px rgba(100, 110, 140, 0.05)',
            border: '1.5px solid #F0F2F7',
          }}
        >
          <TextField
            fullWidth
            placeholder="Search specialties by title, keywords, or tech..."
            variant="standard"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#7E8494', mr: 1 }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              borderRadius: 3,
              px: 3,
              py: 0.8,
              bgcolor: '#635BFF',
              fontWeight: 700,
              textTransform: 'none',
              boxShadow: 'none',
            }}
          >
            Search
          </Button>
        </Paper>
      </Box>

      {/* Content Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
          <CircularProgress sx={{ color: '#635BFF' }} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {specialties.map((spec) => (
            <Grid key={spec.id} size={{ xs: 12, sm: 6, lg: 4 }}>
              <Card
                sx={{
                  borderRadius: 5,
                  p: 1.5,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1.5px solid #F0F2F7',
                  boxShadow: '0 8px 20px rgba(100, 110, 140, 0.04)',
                  transition: '0.2s',
                  '&:hover': {
                    borderColor: '#635BFF',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 30px rgba(99, 91, 255, 0.12)',
                  },
                }}
              >
                <CardContent sx={{ pb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: 3,
                        bgcolor: '#EDEDFE',
                        color: '#635BFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <SchoolIcon fontSize="small" />
                    </Box>
                    <Chip
                      label="Tech Track"
                      size="small"
                      sx={{ bgcolor: '#F5F6FA', color: '#7E8494', fontWeight: 700, borderRadius: 2 }}
                    />
                  </Box>

                  <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#1A1C24' }}>
                    {spec.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#7E8494', mb: 2, minHeight: 40, lineHeight: 1.5 }}>
                    {spec.description}
                  </Typography>

                  {/* Tools preview */}
                  {spec.tools && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2 }}>
                      {spec.tools.split(',').slice(0, 3).map((tool, idx) => (
                        <Chip
                          key={idx}
                          label={tool.trim()}
                          size="small"
                          sx={{ bgcolor: '#F5F6FA', color: '#4A5060', fontSize: '0.75rem', fontWeight: 600 }}
                        />
                      ))}
                    </Box>
                  )}
                </CardContent>

                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate(`/specialties/${spec.id}`)}
                    sx={{
                      borderRadius: 3,
                      borderColor: '#E2E5EE',
                      color: '#635BFF',
                      fontWeight: 700,
                      '&:hover': { bgcolor: '#EDEDFE', borderColor: '#635BFF' },
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}

          {specialties.length === 0 && (
            <Grid size={{ xs: 12 }}>
              <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 5 }}>
                <Typography variant="h6" color="text.secondary">
                  No specialties matched your search.
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      )}
    </AppLayout>
  );
}

export default SpecialtiesPage;