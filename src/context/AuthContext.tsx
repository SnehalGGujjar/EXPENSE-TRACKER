import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, AuthContextType } from '../types';
import { MOCK_USERS } from '../utils/helpers';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for saved user in localStorage (simulating persistence)
    const savedUser = localStorage.getItem('expenseTrackerUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in mock data (will be replaced with Firebase)
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (!foundUser) {
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }
    
    // Create a user object without the password
    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem('expenseTrackerUser', JSON.stringify(userWithoutPassword));
    setIsLoading(false);
  };

  const signup = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const userExists = MOCK_USERS.some(u => u.email === email);
    
    if (userExists) {
      setIsLoading(false);
      throw new Error('User already exists');
    }
    
    // In a real app, we would create the user in Firebase
    // For now, we'll just simulate success and login the user
    const newUser = {
      id: Math.random().toString(36).substring(2, 15),
      email,
      joinDate: new Date(),
      isActive: true,
      isAdmin: false,
    };
    
    setUser(newUser);
    localStorage.setItem('expenseTrackerUser', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('expenseTrackerUser');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};