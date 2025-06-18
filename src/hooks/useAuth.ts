import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { 
  signIn as apiSignIn, 
  signUp as apiSignUp, 
  forgotPassword as apiForgotPassword,
  logout as apiLogout,
  AuthError 
} from '@/api/auth-api';
import { api } from '@/api/dashboard-api';
import { useToastHelpers } from '@/components/ui/toast';
import type { 
  AuthState, 
  SignInCredentials, 
  SignUpCredentials, 
  ForgotPasswordData
} from '@/types/auth';

const INITIAL_STATE: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  profile: null,
  session: null,
  error: null,
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(INITIAL_STATE);
  const router = useRouter();
  const { success, error: showError, info } = useToastHelpers();

  // Get stored token
  const getStoredToken = useCallback(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }, []);

  // Update auth state
  const updateAuthState = useCallback((updates: Partial<AuthState>) => {
    setAuthState(prev => ({ ...prev, ...updates }));
  }, []);

  // Clear auth state
  const clearAuthState = useCallback(() => {
    setAuthState({
      ...INITIAL_STATE,
      isLoading: false,
    });
    apiLogout();
  }, []);

  // Check authentication status
  const checkAuth = useCallback(async () => {
    const token = getStoredToken();
    
    if (!token) {
      updateAuthState({ isAuthenticated: false, isLoading: false });
      return false;
    }

    try {
      const result = await api.checkAuth();
      
      if (result.isAuthenticated && result.profile) {
        updateAuthState({
          isAuthenticated: true,
          isLoading: false,
          profile: result.profile,
          error: null,
        });
        return true;
      } else {
        clearAuthState();
        return false;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      clearAuthState();
      return false;
    }
  }, [getStoredToken, updateAuthState, clearAuthState]);

  // Sign in
  const signIn = useCallback(async (credentials: SignInCredentials) => {
    updateAuthState({ isLoading: true, error: null });

    try {
      const result = await apiSignIn(credentials.email, credentials.password);
      
      if (result.session && result.profile) {
        updateAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: result.user,
          profile: result.profile,
          session: result.session,
          error: null,
        });

        success('Successfully signed in!', 'Welcome back');

        // Route based on onboarding status
        if (!result.profile.has_completed_onboarding) {
          info('Please complete the onboarding process');
          router.push('/onboarding');
        } else {
          router.push('/dashboard');
        }

        return { success: true };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      
      let errorMessage = 'An unexpected error occurred';
      
      if (error instanceof AuthError) {
        switch (error.status) {
          case 401:
            errorMessage = 'Invalid email or password';
            break;
          case 429:
            errorMessage = 'Too many attempts. Please try again later.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      updateAuthState({ isLoading: false, error: errorMessage });
      showError(errorMessage, 'Sign In Failed');
      
      return { success: false, error: errorMessage };
    }
  }, [updateAuthState, success, showError, info, router]);

  // Sign up
  const signUp = useCallback(async (credentials: SignUpCredentials) => {
    updateAuthState({ isLoading: true, error: null });

    try {
      const result = await apiSignUp(
        credentials.email, 
        credentials.password, 
        credentials.name
      );

      if (result.session) {
        updateAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: result.user,
          profile: result.profile,
          session: result.session,
          error: null,
        });

        success('Account created successfully!', 'Welcome');
        router.push('/onboarding');
      } else {
        // Email confirmation required
        updateAuthState({ isLoading: false });
        info('Please check your email to confirm your account', 'Confirmation Required');
      }

      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to create account';
      updateAuthState({ isLoading: false, error: errorMessage });
      showError(errorMessage, 'Sign Up Failed');
      
      return { success: false, error: errorMessage };
    }
  }, [updateAuthState, success, showError, info, router]);

  // Forgot password
  const forgotPassword = useCallback(async (data: ForgotPasswordData) => {
    updateAuthState({ isLoading: true, error: null });

    try {
      await apiForgotPassword(data.email);
      
      updateAuthState({ isLoading: false });
      success('Password reset instructions sent to your email', 'Email Sent');
      
      return { success: true };
    } catch (error) {
      console.error('Forgot password error:', error);
      
      const errorMessage = error instanceof Error ? error.message : 'Failed to send reset email';
      updateAuthState({ isLoading: false, error: errorMessage });
      showError(errorMessage, 'Reset Failed');
      
      return { success: false, error: errorMessage };
    }
  }, [updateAuthState, success, showError]);

  // Sign out
  const signOut = useCallback(async () => {
    clearAuthState();
    success('Successfully signed out', 'Goodbye');
    router.push('/');
  }, [clearAuthState, success, router]);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Re-export auth state properties for easy access
  return {
    // State
    ...authState,
    
    // Computed
    isSignedIn: authState.isAuthenticated,
    hasCompletedOnboarding: authState.profile?.has_completed_onboarding || false,
    
    // Actions
    signIn,
    signUp,
    signOut,
    forgotPassword,
    checkAuth,
    
    // Utilities
    getStoredToken,
    clearAuthState,
  };
}; 