import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

interface ForgotPasswordFormProps {
  onSubmit: (email: string) => Promise<void>;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
  initialEmail?: string;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  onBack,
  isLoading,
  error,
  initialEmail = '',
}) => {
  const [email, setEmail] = useState(initialEmail);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="reset-email" className="text-sm font-medium text-gray-300">
          Email
        </label>
        <Input
          id="reset-email"
          type="email"
          required
          placeholder="you@example.com"
          className="w-full bg-gray-700/50 text-white border-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>

      {error && (
        <Alert variant={error.includes('sent to your email') ? 'default' : 'destructive'}>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <Button 
          type="submit" 
          variant="purple"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending reset link...
            </>
          ) : (
            "Send Reset Link"
          )}
        </Button>
        <Button 
          type="button"
          variant="outline"
          className="w-full text-indigo-400 border-indigo-600 hover:bg-indigo-600/10"
          onClick={onBack}
          disabled={isLoading}
        >
          Back to Sign In
        </Button>
      </div>
    </form>
  );
}; 