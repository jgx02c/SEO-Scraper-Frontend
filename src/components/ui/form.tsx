import React, { ReactNode, FormHTMLAttributes } from 'react';
import { Input } from './input';
import { Button } from './button';
import { Alert, AlertDescription } from './alert';

// Form Container
interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  className?: string;
}

export const Form: React.FC<FormProps> = ({ children, className = '', ...props }) => (
  <form className={`space-y-6 ${className}`} {...props}>
    {children}
  </form>
);

// Form Field
interface FormFieldProps {
  label: string;
  id: string;
  children: ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  children,
  error,
  required = false,
  className = '',
}) => (
  <div className={`space-y-2 ${className}`}>
    <label htmlFor={id} className="text-sm font-medium text-gray-300">
      {label}
      {required && <span className="text-red-400 ml-1">*</span>}
    </label>
    {children}
    {error && (
      <p className="text-red-400 text-sm">{error}</p>
    )}
  </div>
);

// Form Input with built-in field wrapper
interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
}) => (
  <FormField label={label} id={id} error={error} required={required}>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      disabled={disabled}
      className={`w-full bg-gray-700/50 text-white border-gray-600 ${className}`}
    />
  </FormField>
);

// Form Actions (buttons area)
interface FormActionsProps {
  children: ReactNode;
  className?: string;
}

export const FormActions: React.FC<FormActionsProps> = ({ children, className = '' }) => (
  <div className={`flex gap-3 ${className}`}>
    {children}
  </div>
);

// Form Error Display
interface FormErrorProps {
  error: string | null;
  className?: string;
}

export const FormError: React.FC<FormErrorProps> = ({ error, className = '' }) => {
  if (!error) return null;

  return (
    <Alert variant="destructive" className={className}>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};

// Form Success Display
interface FormSuccessProps {
  message?: string | null;
  className?: string;
}

export const FormSuccess: React.FC<FormSuccessProps> = ({ message, className = '' }) => {
  if (!message) return null;

  return (
    <Alert variant="default" className={`border-green-700 bg-green-900/20 text-green-100 ${className}`}>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

// Submit Button with loading state
interface FormSubmitButtonProps {
  isLoading: boolean;
  children: ReactNode;
  loadingText?: string;
  disabled?: boolean;
  className?: string;
}

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  isLoading,
  children,
  loadingText = 'Loading...',
  disabled = false,
  className = '',
}) => (
  <Button
    type="submit"
    variant="purple"
    disabled={isLoading || disabled}
    className={`w-full ${className}`}
  >
    {isLoading ? loadingText : children}
  </Button>
);

// Complete Auth Form Template
interface AuthFormTemplateProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
  success?: string | null | undefined;
  children: ReactNode;
  submitText: string;
  loadingText?: string;
  footer?: ReactNode;
}

export const AuthFormTemplate: React.FC<AuthFormTemplateProps> = ({
  title,
  onSubmit,
  isLoading,
  error,
  success,
  children,
  submitText,
  loadingText,
  footer,
}) => (
  <div className="space-y-6">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
    </div>

    <Form onSubmit={onSubmit}>
      {children}
      
      <FormError error={error} />
      <FormSuccess message={success} />
      
      <FormSubmitButton isLoading={isLoading} loadingText={loadingText}>
        {submitText}
      </FormSubmitButton>
    </Form>

    {footer && (
      <div className="space-y-4 text-center">
        {footer}
      </div>
    )}
  </div>
); 