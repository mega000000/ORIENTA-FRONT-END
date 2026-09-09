// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AssessmentPage from './pages/AssessmentPage';
import AssessmentResultPage from './pages/AssessmentResultPage';
import RecommendationsPage from './pages/RecommendationsPage';
import SpecialtiesPage from './pages/SpecialtiesPage';
import SpecialtyDetailPage from './pages/SpecialtyDetailPage';
import LearningPathPage from './pages/LearningPathPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <OnboardingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessment"
          element={
            <ProtectedRoute>
              <AssessmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessment/result/:sessionId"
          element={
            <ProtectedRoute>
              <AssessmentResultPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/assessment/results/:sessionId"
          element={
            <ProtectedRoute>
              <AssessmentResultPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommendations"
          element={
            <ProtectedRoute>
              <RecommendationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recommendations/:sessionId"
          element={
            <ProtectedRoute>
              <RecommendationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/specialties"
          element={
            <ProtectedRoute>
              <SpecialtiesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/specialties/:id"
          element={
            <ProtectedRoute>
              <SpecialtyDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning-paths/:specialtyId"
          element={
            <ProtectedRoute>
              <LearningPathPage />
            </ProtectedRoute>
          }
        />

        {/* Fallback - Redirect unknown URLs to the public Landing Page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;