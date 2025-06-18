import { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

// Form Types
export interface FormData {
  email: string;
  password: string;
  name?: string;
}

export interface FormState {
  email: string;
  password: string;
}

// Button Types
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'purple';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

// Input Types
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

// Loading Types
export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

// Toast Types
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

export interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

// Dialog Types
export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export interface DialogContentProps {
  children: ReactNode;
  className?: string;
}

// Note: NavigationItem, SubItem, and UserMenuItem are defined in dashboard.ts

// Layout Types
export interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
  footer?: ReactNode;
}

// Component Props Types
export interface ComponentData {
  component: string;
  props?: Record<string, unknown>;
}

export interface ComponentLoaderProps {
  data: ComponentData;
  className?: string;
} 