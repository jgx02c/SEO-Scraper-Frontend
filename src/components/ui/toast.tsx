import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

export interface Toast {
  id: string;
  title?: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toastData: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: Toast = {
      id,
      duration: 5000,
      ...toastData,
    };

    setToasts(prev => [...prev, toast]);

    // Auto remove toast after duration
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAllToasts }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const getToastStyles = () => {
    const baseStyles = "p-4 rounded-lg shadow-lg border backdrop-blur-sm transition-all duration-300 ease-in-out transform translate-x-0 opacity-100";
    
    switch (toast.type) {
      case 'success':
        return `${baseStyles} bg-green-900/90 border-green-700 text-green-100`;
      case 'error':
        return `${baseStyles} bg-red-900/90 border-red-700 text-red-100`;
      case 'warning':
        return `${baseStyles} bg-yellow-900/90 border-yellow-700 text-yellow-100`;
      case 'info':
        return `${baseStyles} bg-blue-900/90 border-blue-700 text-blue-100`;
      default:
        return `${baseStyles} bg-gray-900/90 border-gray-700 text-gray-100`;
    }
  };

  const getIcon = () => {
    const iconClass = "h-5 w-5 flex-shrink-0";
    switch (toast.type) {
      case 'success':
        return <CheckCircle className={`${iconClass} text-green-400`} />;
      case 'error':
        return <AlertCircle className={`${iconClass} text-red-400`} />;
      case 'warning':
        return <AlertTriangle className={`${iconClass} text-yellow-400`} />;
      case 'info':
        return <Info className={`${iconClass} text-blue-400`} />;
      default:
        return <Info className={`${iconClass} text-gray-400`} />;
    }
  };

  return (
    <div className={getToastStyles()}>
      <div className="flex items-start space-x-3">
        {getIcon()}
        <div className="flex-1 min-w-0">
          {toast.title && (
            <p className="text-sm font-semibold">{toast.title}</p>
          )}
          <p className="text-sm opacity-90">{toast.message}</p>
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="mt-2 text-sm underline hover:no-underline focus:outline-none"
            >
              {toast.action.label}
            </button>
          )}
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          className="flex-shrink-0 p-1 rounded hover:bg-black/20 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Convenience hooks for different toast types
export const useToastHelpers = () => {
  const { addToast } = useToast();

  return {
    success: (message: string, title?: string) => 
      addToast({ type: 'success', message, title }),
    error: (message: string, title?: string) => 
      addToast({ type: 'error', message, title }),
    warning: (message: string, title?: string) => 
      addToast({ type: 'warning', message, title }),
    info: (message: string, title?: string) => 
      addToast({ type: 'info', message, title }),
  };
}; 