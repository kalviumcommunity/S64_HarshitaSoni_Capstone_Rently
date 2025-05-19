import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import LandlordDashboard from './pages/LandlordDashboard';
import TenantDashboard from './pages/TenantDashboard';
import DiscoverProperties from './pages/DiscoverProperties';
import ProtectedRoute from './components/ProtectedRoute';
import PropertyOverview from './pages/PropertyOverview';
import PropertyPage from './pages/PropertyPage';
// import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup/:role" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route 
          path="/landlord-dashboard" 
          element={
            <ProtectedRoute allowedRole="landlord">
              <LandlordDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/tenant-dashboard" 
          element={
            <ProtectedRoute allowedRole="tenant">
              <TenantDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/discover" 
          element={
            <ProtectedRoute allowedRole="tenant">
              <DiscoverProperties />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/property/:id" 
          element={
            <ProtectedRoute allowedRole="landlord">
              <PropertyPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/property/:id/:section" 
          element={
            <ProtectedRoute allowedRole="landlord">
              <PropertyPage />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
