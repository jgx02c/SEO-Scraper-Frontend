// pages/signup.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const SignUpPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your signup logic here
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 bg-gray-800 p-8 rounded-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Create an Account</h2>
          <p className="mt-2 text-gray-400">Start your journey with us</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              className="w-full bg-gray-700 text-white border-gray-600"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              type="password"
              placeholder="Password"
              className="w-full bg-gray-700 text-white border-gray-600"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              className="w-full bg-gray-700 text-white border-gray-600"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6">
            Sign Up
          </Button>
        </form>

        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-400 hover:text-blue-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;