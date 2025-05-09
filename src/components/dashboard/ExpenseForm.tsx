import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { useExpenses } from '../../context/ExpenseContext';

type FormValues = {
  amount: string;
  category: 'Food' | 'Transport' | 'Bills' | 'Entertainment';
  date: string;
};

const ExpenseForm: React.FC = () => {
  const { addExpense } = useExpenses();
  
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    },
  });

  const onSubmit = (data: FormValues) => {
    const expense = {
      amount: parseFloat(data.amount),
      category: data.category,
      date: new Date(data.date),
    };
    
    addExpense(expense);
    reset();
  };

  const categoryOptions = [
    { value: 'Food', label: 'Food' },
    { value: 'Transport', label: 'Transport' },
    { value: 'Bills', label: 'Bills' },
    { value: 'Entertainment', label: 'Entertainment' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Expense</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Amount ($)"
          type="number"
          step="0.01"
          placeholder="0.00"
          {...register('amount', {
            required: 'Amount is required',
            min: {
              value: 0.01,
              message: 'Amount must be greater than 0',
            },
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: 'Please enter a valid amount',
            },
          })}
          error={errors.amount?.message}
        />
        
        <Controller
          name="category"
          control={control}
          rules={{ required: 'Category is required' }}
          render={({ field }) => (
            <Select
              label="Category"
              options={categoryOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.category?.message}
            />
          )}
        />
        
        <Input
          label="Date"
          type="date"
          {...register('date', {
            required: 'Date is required',
          })}
          error={errors.date?.message}
        />
        
        <Button
          type="submit"
          className="w-full"
          isLoading={isSubmitting}
        >
          Add Expense
        </Button>
      </form>
    </div>
  );
};

export default ExpenseForm;