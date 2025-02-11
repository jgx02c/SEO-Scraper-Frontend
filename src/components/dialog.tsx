import React from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

interface BaseDialogProps {
  children: React.ReactNode;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({ 
  open, 
  onOpenChange, 
  children, 
  className = "" 
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className={`bg-gray-800 rounded-lg shadow-lg ${className}`}>
        <button 
          className="absolute top-3 right-3 text-white hover:text-gray-300 transition-colors" 
          onClick={() => onOpenChange(false)}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export const DialogContent: React.FC<BaseDialogProps> = ({ 
  children, 
  className = "" 
}) => {
  return <div className={`w-full ${className}`}>{children}</div>;
};

export const DialogHeader: React.FC<BaseDialogProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`mb-4 text-xl font-bold text-white ${className}`}>
      {children}
    </div>
  );
};

export const DialogTitle: React.FC<BaseDialogProps> = ({ 
  children, 
  className = "" 
}) => {
  return <h2 className={className}>{children}</h2>;
};