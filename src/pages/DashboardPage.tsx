import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import ExpenseForm from '../components/dashboard/ExpenseForm';
import ExpenseTable from '../components/dashboard/ExpenseTable';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  
  useEffect(() => {
    document.title = 'Dashboard | ExpenseTracker';
  }, []);
  
  // If user is not logged in, redirect to login page
  if (!isLoading && !user) {
    return <Navigate to="/auth" />;
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Personal Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ExpenseForm />
        </div>
        
        <div className="lg:col-span-2">
          <ExpenseTable />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;