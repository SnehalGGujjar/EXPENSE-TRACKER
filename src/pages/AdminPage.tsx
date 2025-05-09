import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UsersTable from '../components/admin/UsersTable';
import AllExpensesTable from '../components/admin/AllExpensesTable';
import Button from '../components/ui/Button';

const AdminPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'expenses'>('users');
  
  useEffect(() => {
    document.title = 'Admin Panel | ExpenseTracker';
  }, []);
  
  // If user is not logged in, redirect to login page
  if (!isLoading && !user) {
    return <Navigate to="/auth" />;
  }
  
  // If user is not an admin, redirect to dashboard
  if (!isLoading && user && !user.isAdmin) {
    return <Navigate to="/" />;
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
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex space-x-2 border-b border-gray-200">
          <Button
            variant={activeTab === 'users' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('users')}
            className="rounded-b-none"
          >
            Users
          </Button>
          <Button
            variant={activeTab === 'expenses' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('expenses')}
            className="rounded-b-none"
          >
            All Expenses
          </Button>
        </div>
        
        <div className="py-4">
          {activeTab === 'users' ? (
            <UsersTable />
          ) : (
            <AllExpensesTable />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;