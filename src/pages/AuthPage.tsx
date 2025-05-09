import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { DollarSign } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '../context/AuthContext';

const AuthPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  
  // If user is already logged in, redirect to dashboard
  if (user && !isLoading) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 flex items-center justify-center rounded-full bg-blue-100">
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="mt-4 text-2xl font-extrabold text-gray-900">
            ExpenseTracker
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin
              ? 'Sign in to your account'
              : 'Create your account to get started'}
          </p>
        </div>
        
        <div className="mt-8">
          {isLogin ? (
            <LoginForm onToggleForm={toggleForm} />
          ) : (
            <SignupForm onToggleForm={toggleForm} />
          )}
        </div>
        
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Demo Accounts:</p>
          <div className="mt-2 space-y-1">
            <p><strong>Admin:</strong> admin@example.com / admin123</p>
            <p><strong>User:</strong> user@example.com / user123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;