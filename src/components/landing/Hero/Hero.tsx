import React from 'react';
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/signup');
  };

  const handleSignIn = () => {
    router.push('/signin');
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 bg-gray-800/50 backdrop-blur-xl p-8 rounded-xl border border-gray-700/50 relative z-10">
        {/* Main Headline */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">
            SEO Analysis
            <span className="block mt-2 text-indigo-400">Made Simple</span>
          </h1>
          <p className="mt-4 text-gray-400">
            Professional SEO analysis and optimization tools.
          </p>
        </div>

        {/* Auth Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleSignUp}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 text-base"
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          
          <Button
            variant="outline"
            onClick={handleSignIn}
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white font-medium py-3 text-base"
          >
            Sign In
          </Button>
        </div>

        {/* Simple footer text */}
        <p className="text-center text-sm text-gray-500">
          Start analyzing your website&apos;s SEO performance today
        </p>
      </div>
    </section>
  );
};

export default Hero;