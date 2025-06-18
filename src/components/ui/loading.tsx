import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  variant = 'spinner',
  text,
  className = '',
  fullScreen = false,
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'h-4 w-4';
      case 'md': return 'h-6 w-6';
      case 'lg': return 'h-8 w-8';
      case 'xl': return 'h-12 w-12';
      default: return 'h-6 w-6';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm': return 'text-xs';
      case 'md': return 'text-sm';
      case 'lg': return 'text-base';
      case 'xl': return 'text-lg';
      default: return 'text-sm';
    }
  };

  const renderSpinner = () => (
    <Loader2 className={`${getSizeClass()} animate-spin text-indigo-500`} />
  );

  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`bg-indigo-500 rounded-full animate-pulse ${
            size === 'sm' ? 'h-1 w-1' : 
            size === 'md' ? 'h-2 w-2' : 
            size === 'lg' ? 'h-3 w-3' : 'h-4 w-4'
          }`}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s',
          }}
        />
      ))}
    </div>
  );

  const renderPulse = () => (
    <div className={`bg-indigo-500 rounded-full animate-pulse ${getSizeClass()}`} />
  );

  const renderSkeleton = () => (
    <div className="animate-pulse space-y-2">
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
    </div>
  );

  const getLoadingElement = () => {
    switch (variant) {
      case 'spinner': return renderSpinner();
      case 'dots': return renderDots();
      case 'pulse': return renderPulse();
      case 'skeleton': return renderSkeleton();
      default: return renderSpinner();
    }
  };

  const content = (
    <div className={`flex flex-col items-center justify-center space-y-2 ${className}`}>
      {variant !== 'skeleton' && getLoadingElement()}
      {variant === 'skeleton' && getLoadingElement()}
      {text && (
        <p className={`text-gray-400 ${getTextSize()}`}>{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gray-800/90 p-8 rounded-lg border border-gray-700">
          {content}
        </div>
      </div>
    );
  }

  return content;
};

// Specific loading components for common use cases
export const PageLoading: React.FC<{ text?: string }> = ({ text = "Loading..." }) => (
  <Loading variant="spinner" size="lg" text={text} fullScreen />
);

export const ButtonLoading: React.FC = () => (
  <Loading variant="spinner" size="sm" className="inline-flex" />
);

export const ContentLoading: React.FC<{ text?: string }> = ({ text }) => (
  <div className="flex items-center justify-center py-12">
    <Loading variant="spinner" size="md" text={text} />
  </div>
);

export const SkeletonLoading: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 3, 
  className = '' 
}) => (
  <div className={`animate-pulse space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-4 bg-gray-700 rounded"
        style={{
          width: i === lines - 1 ? '75%' : '100%',
        }}
      />
    ))}
  </div>
); 