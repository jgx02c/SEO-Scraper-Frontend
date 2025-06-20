import React, { Component, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent } from './card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Something went wrong in {this.props.componentName || 'this section'}
                </h3>
                <p className="text-gray-400 mb-2">
                  An unexpected error occurred. Please try reloading this section.
                </p>
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="text-left text-xs text-gray-500 mt-4 p-2 bg-gray-900 rounded">
                    <summary className="cursor-pointer">Error details</summary>
                    <pre className="mt-2 whitespace-pre-wrap">
                      {this.state.error.message}
                      {this.state.error.stack}
                    </pre>
                  </details>
                )}
              </div>
              <Button 
                onClick={this.handleRetry} 
                variant="outline" 
                className="border-gray-600 hover:bg-gray-700"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

// Hook-based error boundary for functional components
export const useErrorHandler = () => {
  return (error: Error, errorInfo?: React.ErrorInfo) => {
    console.error('Error caught by useErrorHandler:', error, errorInfo);
    // You could integrate this with your error reporting service
    // e.g., Sentry, LogRocket, etc.
  };
};

// Higher-order component for wrapping components with error boundary
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  componentName?: string
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback} componentName={componentName || Component.displayName || Component.name}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}; 