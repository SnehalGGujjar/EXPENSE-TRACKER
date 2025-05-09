import React, { createContext, useState, useContext, useEffect } from 'react';
import { Expense, ExpenseContextType } from '../types';
import { useAuth } from './AuthContext';
import { MOCK_EXPENSES, generateId } from '../utils/helpers';

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      
      // In a real app, we would fetch the user's expenses from Firebase
      // For now, we'll use mock data
      const fetchExpenses = async () => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (user.isAdmin) {
          // Admin sees all expenses
          setExpenses(MOCK_EXPENSES as Expense[]);
        } else {
          // Regular user only sees their own expenses
          setExpenses(
            MOCK_EXPENSES.filter(expense => expense.userId === user.id) as Expense[]
          );
        }
        
        setIsLoading(false);
      };
      
      fetchExpenses();
    } else {
      setExpenses([]);
      setIsLoading(false);
    }
  }, [user]);

  const addExpense = (newExpense: Omit<Expense, 'id' | 'userId'>) => {
    if (!user) return;
    
    const expense: Expense = {
      ...newExpense,
      id: generateId(),
      userId: user.id,
    };
    
    setExpenses([...expenses, expense]);
    
    // In a real app, we would save this to Firebase
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
    
    // In a real app, we would delete this from Firebase
  };

  const getExpensesByMonth = (month: number, year: number) => {
    return expenses.filter(expense => {
      const expenseDate = expense.date;
      return (
        expenseDate.getMonth() === month &&
        expenseDate.getFullYear() === year
      );
    });
  };

  return (
    <ExpenseContext.Provider
      value={{ expenses, isLoading, addExpense, deleteExpense, getExpensesByMonth }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = (): ExpenseContextType => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error('useExpenses must be used within an ExpenseProvider');
  }
  return context;
};