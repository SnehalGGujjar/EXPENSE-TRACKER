import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ExpenseProvider } from './context/ExpenseContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ExpenseProvider>
          <AppRoutes />
        </ExpenseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;