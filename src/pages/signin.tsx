import { useState } from "react";
import { useRouter } from "next/router";
import { signIn, forgotPassword, AuthError } from "@/api/auth-api";
import { useToastHelpers } from "@/components/ui/toast";
import { AuthLayout, AuthFooter } from "@/components/auth/AuthLayout";
import { SignInForm } from "@/components/auth/SignInForm";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

const SignInPage = () => {
  const router = useRouter();
  const { success, error: showError, info } = useToastHelpers();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSignIn = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);

    try {
      console.log('Attempting to sign in...');
      const result = await signIn(email, password);
      console.log('Sign in response:', {
        hasSession: !!result.session,
        hasAccessToken: !!result.session?.access_token,
        hasProfile: !!result.profile
      });

      success('Successfully signed in!', 'Welcome back');

      // Check if profile exists
      if (!result.profile) {
        console.log("No profile in response - redirecting to onboarding");
        info('Please complete your profile setup');
        router.push("/onboarding");
        return;
      }

      // Route based on onboarding status
      if (!result.profile.has_completed_onboarding) {
        console.log("User hasn't completed onboarding - redirecting to onboarding");
        info('Please complete the onboarding process');
        router.push("/onboarding");
      } else {
        console.log("User has completed onboarding - redirecting to dashboard");
        router.push("/dashboard");
      }
    } catch (err) {
      console.error('Sign in error:', err);
      
      if (err instanceof AuthError) {
        // Handle specific auth errors with better messaging
        switch (err.status) {
          case 401:
            showError('Invalid email or password', 'Authentication Failed');
            setError('Invalid email or password. Please check your credentials and try again.');
            break;
          case 429:
            showError('Too many attempts. Please try again later.', 'Rate Limited');
            setError('Too many sign in attempts. Please wait before trying again.');
            break;
          case 500:
            showError('Server error. Please try again later.', 'Server Error');
            setError('Something went wrong on our end. Please try again in a moment.');
            break;
          default:
            showError(err.message, 'Sign In Failed');
            setError(err.message);
        }
      } else {
        const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred during sign in';
        showError(errorMessage, 'Sign In Failed');
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (email: string) => {
    if (!email) {
      showError('Please enter your email address', 'Email Required');
      setError('Please enter your email address');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      await forgotPassword(email);
      
      success('Password reset instructions sent to your email', 'Email Sent');
      setError('Password reset instructions sent to your email');
      
      // Auto switch back to sign in after success
      setTimeout(() => {
        setShowForgotPassword(false);
        setError(null);
      }, 3000);
    } catch (err) {
      if (err instanceof AuthError) {
        showError(err.message, 'Reset Failed');
        setError(err.message);
      } else {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        showError(errorMessage, 'Reset Failed');
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle={showForgotPassword ? "Reset your password" : "Sign in to your account"}
      footer={!showForgotPassword ? <AuthFooter /> : null}
    >
      {!showForgotPassword ? (
        <SignInForm
          onSubmit={handleSignIn}
          isLoading={isLoading}
          error={error}
          onForgotPassword={() => setShowForgotPassword(true)}
        />
      ) : (
        <ForgotPasswordForm
          onSubmit={handleForgotPassword}
          onBack={() => setShowForgotPassword(false)}
          isLoading={isLoading}
          error={error}
        />
      )}
    </AuthLayout>
  );
};

export default SignInPage;