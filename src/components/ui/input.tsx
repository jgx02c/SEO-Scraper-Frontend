// components/Input.tsx
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: React.FC<InputProps> = ({ className = "", ...props }) => (
  <input 
    className={`w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-500 bg-gray-700 text-white ${className}`} 
    {...props} 
  />
);


