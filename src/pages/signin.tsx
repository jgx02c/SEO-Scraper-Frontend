import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { signIn, forgotPassword, checkUserState } from "./api/authAPI";

interface FormState {
  email: string;
  password: string;
}

const SignInPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn(formData.email, formData.password);

      if (!result.success || !result.token) {
        throw new Error(result.error || 'Failed to sign in');
      }

      // Check user's onboarding status
      const userState = await checkUserState();
      
      if (!userState) {
        throw new Error('Failed to get user state');
      }

      // Route based on onboarding status
      if (!userState.hasCompletedOnboarding) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const result = await forgotPassword(formData.email);

      if (!result.success) {
        throw new Error(result.error || 'Failed to send reset email');
      }

      // Show success message in alert but keep it friendly
      setError('Password reset instructions sent to your email');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900/20 to-gray-900 flex flex-col items-center justify-center p-6 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Back button */}
      <div className="absolute top-6 left-6">
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="text-gray-400 hover:text-indigo-400 hover:bg-transparent h-auto py-2 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="text-left">Back to home</span>
        </Button>
      </div>

      <div className="w-full max-w-md space-y-8 bg-gray-800/50 backdrop-blur-xl p-8 rounded-xl border border-gray-700/50 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="mt-2 text-gray-400">
            {showForgotPassword ? "Reset your password" : "Sign in to your account"}
          </p>
        </div>

        {error && (
          <Alert variant={error.includes('sent to your email') ? 'default' : 'destructive'}>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!showForgotPassword ? (
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

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
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
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-6">
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isLoading}
              />
            </div>

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
                onClick={() => setShowForgotPassword(false)}
                disabled={isLoading}
              >
                Back to Sign In
              </Button>
            </div>
          </form>
        )}

        <div className="space-y-4 text-center">
          <p className="text-gray-400">Or</p>

          <p className="text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;