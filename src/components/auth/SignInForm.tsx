import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

interface SignInFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  onForgotPassword: () => void;
}

interface FormData {
  email: string;
  password: string;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  onSubmit,
  isLoading,
  error,
  onForgotPassword,
}) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData.email, formData.password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-300">
            Email
          </label>
          <Input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full bg-gray-700/50 text-white border-gray-600"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-300">
            Password
          </label>
          <Input
            id="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full bg-gray-700/50 text-white border-gray-600"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            disabled={isLoading}
          />
        </div>
      </div>

      {error && (
        <Alert variant={error.includes('sent to your email') ? 'default' : 'destructive'}>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          disabled={isLoading}
        >
          Forgot your password?
        </button>
      </div>

      <Button 
        type="submit" 
        variant="purple"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </form>
  );
}; 