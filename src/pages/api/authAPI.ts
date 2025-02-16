// utils/auth-api.ts

interface AuthResponse {
    success: boolean;
    token?: string;
    message?: string;
    error?: string;
    user?: {
      id: string;
      email: string;
      hasCompletedOnboarding: boolean;
      websiteUrl?: string;
    };
  }
  
  interface UserState {
    hasCompletedOnboarding: boolean;
    reportsGenerated: boolean;
  }
  
  export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign in');
      }
  
      // Store JWT token
      if (data.token) {
        localStorage.setItem('jwt_token', data.token);
      }
  
      return {
        success: true,
        token: data.token,
        user: data.user
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    }
  };
  
  export const signUp = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }
  
      // Store JWT token
      if (data.token) {
        localStorage.setItem('jwt_token', data.token);
      }
  
      return {
        success: true,
        token: data.token,
        user: data.user
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    }
  };
  
  export const forgotPassword = async (email: string): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reset email');
      }
  
      return {
        success: true,
        message: 'Password reset link sent to your email'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      };
    }
  };
  
  export const checkUserState = async (): Promise<UserState> => {
    try {
      const token = localStorage.getItem('jwt_token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/state`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user state');
      }
  
      const data = await response.json();
      return {
        hasCompletedOnboarding: data.hasCompletedOnboarding,
        reportsGenerated: data.reportsGenerated
      };
    } catch (error) {
      throw error;
    }
  };
  
  export const checkReportsStatus = async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem('jwt_token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reports/status`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch reports status');
      }
  
      const data = await response.json();
      return data.isComplete;
    } catch (error) {
      throw error;
    }
  };