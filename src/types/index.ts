export type User = {
  id: string;
  email: string;
  joinDate: Date;
  isActive: boolean;
  isAdmin: boolean;
};

export type Expense = {
  id: string;
  userId: string;
  amount: number;
  category: 'Food' | 'Transport' | 'Bills' | 'Entertainment';
  date: Date;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export type ExpenseContextType = {
  expenses: Expense[];
  isLoading: boolean;
  addExpense: (expense: Omit<Expense, 'id' | 'userId'>) => void;
  deleteExpense: (id: string) => void;
  getExpensesByMonth: (month: number, year: number) => Expense[];
};