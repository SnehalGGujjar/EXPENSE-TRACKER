import { format } from 'date-fns';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return format(date, 'MMM d, yyyy');
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Mock users for demo purpose (to be replaced with Firebase)
export const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    joinDate: new Date(2024, 0, 15),
    isActive: true,
    isAdmin: true,
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    joinDate: new Date(2024, 1, 20),
    isActive: true,
    isAdmin: false,
  },
];

// Mock expenses for demo purpose (to be replaced with Firebase)
export const MOCK_EXPENSES = [
  {
    id: '1',
    userId: '2',
    amount: 20,
    category: 'Food',
    date: new Date(2024, 4, 20), // May 20, 2024
  },
  {
    id: '2',
    userId: '2',
    amount: 35.50,
    category: 'Transport',
    date: new Date(2024, 4, 18), // May 18, 2024
  },
  {
    id: '3',
    userId: '2',
    amount: 75.99,
    category: 'Bills',
    date: new Date(2024, 4, 15), // May 15, 2024
  },
  {
    id: '4',
    userId: '2',
    amount: 42.75,
    category: 'Entertainment',
    date: new Date(2024, 4, 10), // May 10, 2024
  },
] as const;