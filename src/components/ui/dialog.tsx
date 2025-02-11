// components/Dialog.tsx
import React from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-lg" style={{ width: '1200px', height: '800px' }}>
        <button 
          className="absolute top-3 right-3 text-white hover:text-gray-300" 
          onClick={() => onOpenChange(false)}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export const DialogContent: React.FC<DialogContentProps> = ({ children, className = "" }) => {
  return (
    <div className={`flex h-full w-full p-6 ${className}`}>
      {children}
    </div>
  );
};

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children, className = "" }) => {
  return <div className={`mb-4 text-xl font-bold text-white ${className}`}>{children}</div>;
};

export const DialogTitle: React.FC<DialogTitleProps> = ({ children, className = "" }) => {
  return <h2 className={className}>{children}</h2>;
};