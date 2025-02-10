// components/Card.tsx
import React, { ReactNode } from "react";

interface CardProps {
  className?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = "", children }) => (
  <div className={`bg-gray-800 rounded-xl shadow-lg border border-gray-700 ${className}`}>
    {children}
  </div>
);

export const CardContent: React.FC<CardProps> = ({ className = "", children }) => (
  <div className={`p-6 space-y-4 ${className}`}>
    {children}
  </div>
);