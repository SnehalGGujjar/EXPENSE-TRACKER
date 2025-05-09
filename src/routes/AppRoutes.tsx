import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthPage from '../pages/AuthPage';
import DashboardPage from '../pages/DashboardPage';
import AdminPage from '../pages/AdminPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      
      <Route path="/" element={
        <MainLayout>
          <DashboardPage />
        </MainLayout>
      } />
      
      <Route path="/admin" element={
        <MainLayout>
          <AdminPage />
        </MainLayout>
      } />
      
      {/* Redirect all other routes to the dashboard */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;