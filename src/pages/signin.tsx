import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthLayout, AuthFooter } from "@/components/auth";
import { SignInForm } from "@/components/auth";
import { ForgotPasswordForm } from "@/components/auth";
import { DevNotice } from "@/components/ui/dev-notice";

const SignInPage = () => {
  const { signIn, forgotPassword, isLoading, error } = useAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showNetworkError, setShowNetworkError] = useState(false);

  // Check for network-related errors
  useEffect(() => {
    if (error && (
      error.includes('Unable to connect') || 
      error.includes('Failed to fetch') ||
      error.includes('NETWORK_ERROR')
    )) {
      setShowNetworkError(true);
    } else {
      setShowNetworkError(false);
    }
  }, [error]);

  const handleSignIn = async (email: string, password: string) => {
    await signIn({ email, password });
  };

  const handleForgotPassword = async (email: string) => {
    const result = await forgotPassword({ email });
    
    if (result.success) {
      // Auto switch back to sign in after success
      setTimeout(() => {
        setShowForgotPassword(false);
      }, 3000);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle={showForgotPassword ? "Reset your password" : "Sign in to your account"}
      footer={!showForgotPassword ? <AuthFooter /> : null}
    >
      {showNetworkError ? (
        <div className="space-y-6">
          <DevNotice 
            title="Backend Server Not Available"
            message="Unable to connect to the authentication server. This usually means the backend server is not running."
          />
          <div className="text-center">
            <button
              onClick={() => setShowNetworkError(false)}
              className="text-indigo-400 hover:text-indigo-300 text-sm underline"
            >
              Try signing in anyway
            </button>
          </div>
        </div>
      ) : !showForgotPassword ? (
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