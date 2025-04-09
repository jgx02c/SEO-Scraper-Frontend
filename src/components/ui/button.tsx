import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'purple';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const getVariantStyles = (variant: ButtonProps['variant'] = 'default') => {
  const variants = {
    default: 'bg-primary text-white hover:bg-primary/90',
    destructive: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'hover:bg-gray-100',
    link: 'text-blue-600 underline-offset-4 hover:underline',
    purple: 'bg-indigo-600 text-white hover:bg-indigo-600'
  };
  return variants[variant];
};

const getSizeStyles = (size: ButtonProps['size'] = 'default') => {
  const sizes = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 px-3 py-1 text-sm',
    lg: 'h-12 px-8 py-3',
    icon: 'h-9 w-9 p-2'
  };
  return sizes[size];
};

export const Button: React.FC<ButtonProps> = ({ 
  className = "", 
  children, 
  variant = 'default',
  size = 'default',
  ...props 
}) => (
  <button 
    className={`
      rounded-lg 
      font-medium 
      transition-colors 
      duration-200 
      focus:outline-none 
      focus:ring-2 
      focus:ring-blue-500 
      ${getVariantStyles(variant)}
      ${getSizeStyles(size)}
      ${className}
    `} 
    {...props}
  >
    {children}
  </button>
);