import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, BarChart3, Users, User, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/auth');
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <DollarSign className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">ExpenseTracker</span>
              </Link>
            </div>
            
            {user && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <User size={18} />
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:block">
                    {user.email}
                  </span>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut size={16} className="mr-1" />
                  <span>Logout</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-grow flex">
        {user && (
          <aside className="w-16 sm:w-64 bg-white border-r border-gray-200 z-10">
            <nav className="mt-5 px-2">
              <Link
                to="/"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  location.pathname === '/'
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="mr-3 h-6 w-6" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              
              {user.isAdmin && (
                <Link
                  to="/admin"
                  className={`mt-1 group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    location.pathname === '/admin'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Users className="mr-3 h-6 w-6" />
                  <span className="hidden sm:inline">Admin Panel</span>
                </Link>
              )}
            </nav>
          </aside>
        )}
        
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;