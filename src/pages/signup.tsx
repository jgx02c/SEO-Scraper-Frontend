import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { signUp } from "./api/authAPI";

interface FormState {
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    // Add any additional password validation rules here
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await signUp(formData.email, formData.password);

      if (!result.success) {
        throw new Error(result.error);
      }

      // The signUp utility has already stored the JWT token
      // Now we can redirect to onboarding
      router.push("/onboarding");
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
          <h2 className="text-3xl font-bold text-white">Create an Account</h2>
          <p className="mt-2 text-gray-400">Start your journey with us</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
              <p className="text-xs text-gray-400 mt-1">
                Password must be at least 8 characters long and contain uppercase, lowercase, 
                number, and special character
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="confirm-password" className="text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <Input
                id="confirm-password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-gray-700/50 text-white border-gray-600"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                disabled={isLoading}
              />
            </div>
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
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <div className="space-y-4 text-center">
          <p className="text-gray-400">Or</p>

          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/signin" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;