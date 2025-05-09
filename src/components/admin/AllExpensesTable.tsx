import React, { useState } from 'react';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { useExpenses } from '../../context/ExpenseContext';
import { MOCK_USERS } from '../../utils/helpers';
import { formatCurrency } from '../../utils/helpers';
import Select from '../ui/Select';

const AllExpensesTable: React.FC = () => {
  const { expenses, deleteExpense } = useExpenses();
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  
  // Generate years (current year and 5 years back)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);
  
  const months = [
    { value: '0', label: 'January' },
    { value: '1', label: 'February' },
    { value: '2', label: 'March' },
    { value: '3', label: 'April' },
    { value: '4', label: 'May' },
    { value: '5', label: 'June' },
    { value: '6', label: 'July' },
    { value: '7', label: 'August' },
    { value: '8', label: 'September' },
    { value: '9', label: 'October' },
    { value: '10', label: 'November' },
    { value: '11', label: 'December' },
  ];
  
  // Filter expenses by selected month and year
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = expense.date;
    return (
      expenseDate.getMonth() === selectedMonth &&
      expenseDate.getFullYear() === selectedYear
    );
  });
  
  // Get user email by user ID
  const getUserEmail = (userId: string) => {
    const user = MOCK_USERS.find(user => user.id === userId);
    return user ? user.email : 'Unknown User';
  };
  
  // Calculate total amount for the filtered expenses
  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <h2 className="text-xl font-semibold text-gray-800">All Expenses</h2>
          
          <div className="flex space-x-2">
            <Select
              options={months}
              value={selectedMonth.toString()}
              onChange={(value) => setSelectedMonth(parseInt(value))}
              className="w-32"
              fullWidth={false}
            />
            
            <Select
              options={years.map(year => ({ value: year.toString(), label: year.toString() }))}
              value={selectedYear.toString()}
              onChange={(value) => setSelectedYear(parseInt(value))}
              className="w-24"
              fullWidth={false}
            />
          </div>
        </div>
      </div>
      
      {filteredExpenses.length > 0 ? (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getUserEmail(expense.userId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {expense.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(expense.date, 'MMM d')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {filteredExpenses.length} expense{filteredExpenses.length !== 1 && 's'}
              </span>
              <span className="text-lg font-semibold text-gray-800">
                Total: {formatCurrency(totalAmount)}
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="p-6 text-center text-gray-500">
          <p className="mb-4">No expenses found for this period.</p>
        </div>
      )}
    </div>
  );
};

export default AllExpensesTable;