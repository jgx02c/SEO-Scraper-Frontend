// components/Button.tsx
import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ className = "", children, ...props }) => (
  <button 
    className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`} 
    {...props}
  >
    {children}
  </button>
);
