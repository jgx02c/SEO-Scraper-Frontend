import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AuthLayout, AuthFooter } from "@/components/auth";
import { SignInForm } from "@/components/auth";
import { ForgotPasswordForm } from "@/components/auth";

const SignInPage = () => {
  const { signIn, forgotPassword, isLoading, error } = useAuth();
  const [showForgotPassword, setShowForgotPassword] = useState(false);

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