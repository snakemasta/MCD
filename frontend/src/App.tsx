import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Dashboard
import DashboardPage from './pages/dashboard/DashboardPage';

// Investigations
import InvestigationsListPage from './pages/investigations/InvestigationsListPage';
import InvestigationDetailPage from './pages/investigations/InvestigationDetailPage';
import CreateInvestigationPage from './pages/investigations/CreateInvestigationPage';

// Evidence
import EvidenceManagementPage from './pages/evidence/EvidenceManagementPage';

// Persons
import PersonsListPage from './pages/persons/PersonsListPage';
import PersonDetailPage from './pages/persons/PersonDetailPage';

// Warrants
import WarrantsPage from './pages/warrants/WarrantsPage';

// BOLOs
import BOLOsPage from './pages/bolos/BOLOsPage';

// Interviews
import InterviewsPage from './pages/interviews/InterviewsPage';

// Admin
import AdminPanelPage from './pages/admin/AdminPanelPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Investigations */}
            <Route path="/investigations" element={<InvestigationsListPage />} />
            <Route path="/investigations/new" element={<CreateInvestigationPage />} />
            <Route path="/investigations/:id" element={<InvestigationDetailPage />} />

            {/* Evidence */}
            <Route path="/evidence" element={<EvidenceManagementPage />} />
            <Route path="/investigations/:id/evidence" element={<EvidenceManagementPage />} />

            {/* Persons */}
            <Route path="/persons" element={<PersonsListPage />} />
            <Route path="/persons/:id" element={<PersonDetailPage />} />

            {/* Warrants */}
            <Route path="/warrants" element={<WarrantsPage />} />

            {/* BOLOs */}
            <Route path="/bolos" element={<BOLOsPage />} />

            {/* Interviews */}
            <Route path="/interviews" element={<InterviewsPage />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminPanelPage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
