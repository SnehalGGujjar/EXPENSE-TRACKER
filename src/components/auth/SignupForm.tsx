import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

interface SignupFormProps {
  onToggleForm: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onToggleForm }) => {
  const { signup } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      await signup(data.email, data.password);
    } catch (error) {
      setErrorMessage((error as Error).message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Sign Up</h2>
      
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
          {errorMessage}
        </div>
      )}
      
      <Input
        label="Email"
        type="email"
        placeholder="your@email.com"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
        error={errors.email?.message}
      />
      
      <Input
        label="Password"
        type="password"
        placeholder="Create a password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
        error={errors.password?.message}
      />
      
      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        {...register('confirmPassword', {
          required: 'Please confirm your password',
          validate: value => 
            value === password || 'Passwords do not match',
        })}
        error={errors.confirmPassword?.message}
      />
      
      <div className="flex flex-col space-y-3 pt-2">
        <Button type="submit" isLoading={isLoading}>
          Sign Up
        </Button>
        
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onToggleForm}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Login
          </button>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;