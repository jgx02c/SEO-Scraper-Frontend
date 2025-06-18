import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
  footer?: ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showBackButton = true,
  backButtonText = "Back to home",
  backButtonHref = "/",
  footer,
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (backButtonHref) {
      router.push(backButtonHref);
    } else {
      router.back();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900/20 to-gray-900 flex flex-col items-center justify-center p-6 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      {/* Back button */}
      {showBackButton && (
        <div className="absolute top-6 left-6">
          <Button
            variant="ghost"
            onClick={handleBackClick}
            className="text-gray-400 hover:text-indigo-400 hover:bg-transparent h-auto py-2 flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-left">{backButtonText}</span>
          </Button>
        </div>
      )}

      <div className="w-full max-w-md space-y-8 bg-gray-800/50 backdrop-blur-xl p-8 rounded-xl border border-gray-700/50 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-gray-400">{subtitle}</p>
          )}
        </div>

        {children}

        {footer && (
          <div className="space-y-4 text-center">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// Common footer components for auth pages
export const AuthFooter: React.FC = () => (
  <>
    <p className="text-gray-400">Or</p>
    <p className="text-gray-400">
      Don&apos;t have an account?{" "}
      <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 transition-colors">
        Sign up
      </Link>
    </p>
  </>
);

export const SignUpFooter: React.FC = () => (
  <>
    <p className="text-gray-400">Or</p>
    <p className="text-gray-400">
      Already have an account?{" "}
      <Link href="/signin" className="text-indigo-400 hover:text-indigo-300 transition-colors">
        Sign in
      </Link>
    </p>
  </>
); 