
// components/layout/ParallaxWrapper/ParallaxWrapper.tsx
import React from 'react';

interface ParallaxWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({ 
  children,
  className = ""
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
};