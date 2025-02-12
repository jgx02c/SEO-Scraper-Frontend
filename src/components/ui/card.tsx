// components/ui/card.tsx
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = "", children }) => (
  <div className={cn("bg-gray-800 rounded-xl shadow-lg border border-gray-700", className)}>
    {children}
  </div>
);

export const CardHeader: React.FC<CardProps> = ({ className = "", children }) => (
  <div className={cn("p-6 pb-3", className)}>
    {children}
  </div>
);

export const CardTitle: React.FC<CardProps> = ({ className = "", children }) => (
  <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>
    {children}
  </h3>
);

export const CardContent: React.FC<CardProps> = ({ className = "", children }) => (
  <div className={cn("p-6 space-y-4", className)}>
    {children}
  </div>
);

