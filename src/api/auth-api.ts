// utils/auth-api.ts
// Define a global base URL with environment variable support and fallback
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

import type { AuthResponse } from '@/types/auth';

// Enhanced error class for better error handling
export class AuthError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'AuthError';
  }
}

// Helper function to handle API responses with better error information
const handleResponse = async (response: Response) => {
  // Check if response is JSON
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    console.error('Non-JSON response received:', text.substring(0, 200));
    throw new AuthError(response.status, 'Server returned non-JSON response. Please check if the API server is running.', 'INVALID_RESPONSE');
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    console.error('JSON parsing error:', error);
    throw new AuthError(
      response.status,
      `Failed to parse response: ${response.statusText}`,
      'PARSE_ERROR'
    );
  }
  
  if (!response.ok) {
    const message = data.detail || data.message || `HTTP ${response.status}: ${response.statusText}`;
    throw new AuthError(response.status, message, data.code);
  }
  
  return data as AuthResponse;
};

// Helper function to get auth header
export const getAuthHeader = () => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  // Ensure token is properly formatted with Bearer prefix
  const authToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  console.log('Auth header format check:', {
    originalLength: token.length,
    formattedLength: authToken.length,
    startsWithBearer: authToken.startsWith('Bearer '),
    format: `${authToken.substring(0, 15)}...`
  });
  
  return { 'Authorization': authToken };
};

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    console.log('Attempting to sign in user with email:', email);
    console.log('API URL:', `${BASE_URL}/api/auth/signin`);
    
    const response = await fetch(`${BASE_URL}/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('Response status:', response.status);
    
    const data = await handleResponse(response);
    console.log('Sign in response:', {
      hasSession: !!data.session,
      hasUser: !!data.user,
      hasProfile: !!data.profile,
      hasAccessToken: !!data.session?.access_token,
      tokenLength: data.session?.access_token?.length,
      tokenFormat: data.session?.access_token ? `${data.session.access_token.substring(0, 10)}...` : 'none',
      responseKeys: Object.keys(data),
      fullResponse: data
    });

    // Store tokens from session
    if (data.session) {
      // Store raw token without Bearer prefix
      localStorage.setItem('access_token', data.session.access_token);
      localStorage.setItem('refresh_token', data.session.refresh_token);
      
      // Verify token was stored
      const storedToken = localStorage.getItem('access_token');
      console.log('Token storage verification:', {
        stored: !!storedToken,
        length: storedToken?.length,
        format: storedToken ? `${storedToken.substring(0, 10)}...` : 'none'
      });
    } else {
      throw new Error('No session data received from server');
    }

    return data;
  } catch (error) {
    console.error('Sign in error:', error);
    
    // Handle different types of network errors
    if (error instanceof TypeError) {
      const errorMessage = error.message.toLowerCase();
      
      if (errorMessage.includes('fetch') || errorMessage.includes('network request failed')) {
        throw new AuthError(503, 'Unable to connect to authentication server. Please check your internet connection and try again.', 'NETWORK_ERROR');
      }
      
      if (errorMessage.includes('name or service not known') || errorMessage.includes('getaddrinfo')) {
        throw new AuthError(503, 'Authentication server is unreachable. The server may be down or the URL is incorrect. Please contact support if this persists.', 'SERVER_UNREACHABLE');
      }
      
      if (errorMessage.includes('connection refused') || errorMessage.includes('econnrefused')) {
        throw new AuthError(503, 'Connection to authentication server was refused. The server may not be running on the expected port.', 'CONNECTION_REFUSED');
      }
      
      if (errorMessage.includes('timeout') || errorMessage.includes('etimedout')) {
        throw new AuthError(504, 'Request to authentication server timed out. Please check your connection and try again.', 'TIMEOUT');
      }
      
      // Generic network error fallback
      throw new AuthError(503, 'Network error occurred while connecting to authentication server. Please check your connection and try again.', 'NETWORK_ERROR');
    }
    
    // Handle AuthError instances (don't re-wrap)
    if (error instanceof AuthError) {
      throw error;
    }
    
    // Handle other unexpected errors
    throw new AuthError(500, 'An unexpected error occurred during sign in. Please try again.', 'UNKNOWN_ERROR');
  }
};

export const signUp = async (email: string, password: string, name?: string): Promise<AuthResponse> => {
  try {
    const userData = { email, password, name };
    console.log('Attempting to sign up user with email:', email);
    console.log('API URL:', `${BASE_URL}/api/auth/signup`);
    
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    // Check if response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response received:', text.substring(0, 200));
      throw new AuthError(response.status, 'Server returned non-JSON response. Please check if the API server is running.', 'INVALID_RESPONSE');
    }

    const data = await response.json();
    console.log('Sign up response:', {
      hasUser: !!data.user,
      hasSession: !!data.session,
      message: data.message
    });
    
    if (!response.ok) {
      throw new AuthError(response.status, data.detail || data.message || 'Signup failed', data.code);
    }

    // Handle case where signup is successful but email confirmation is required
    if (!data.session) {
      console.log('Signup successful but email confirmation required');
      return {
        user: data.user,
        session: null,
        profile: {
          id: data.user.id,
          name: data.user.user_metadata?.name || '',
          has_completed_onboarding: false,
          company: data.user.user_metadata?.company || null,
          role: data.user.user_metadata?.role || '',
          roles: [],
          website_url: null,
          analysis_status: null,
          current_business_id: null,
          created_at: data.user.created_at,
          updated_at: data.user.updated_at
        },
        message: data.message || 'Please check your email to confirm your account'
      };
    }

    // Store tokens from session (if available)
    if (data.session) {
      localStorage.setItem('access_token', data.session.access_token);
      localStorage.setItem('refresh_token', data.session.refresh_token);
      
      // Verify token was stored
      const storedToken = localStorage.getItem('access_token');
      console.log('Token storage verification:', {
        stored: !!storedToken,
        length: storedToken?.length
      });
    }

    return data;
  } catch (error) {
    console.error('Sign up error:', error);
    
    // Handle different types of network errors
    if (error instanceof TypeError) {
      const errorMessage = error.message.toLowerCase();
      
      if (errorMessage.includes('fetch') || errorMessage.includes('network request failed')) {
        throw new AuthError(503, 'Unable to connect to authentication server. Please check your internet connection and try again.', 'NETWORK_ERROR');
      }
      
      if (errorMessage.includes('name or service not known') || errorMessage.includes('getaddrinfo')) {
        throw new AuthError(503, 'Authentication server is unreachable. The server may be down or the URL is incorrect. Please contact support if this persists.', 'SERVER_UNREACHABLE');
      }
      
      if (errorMessage.includes('connection refused') || errorMessage.includes('econnrefused')) {
        throw new AuthError(503, 'Connection to authentication server was refused. The server may not be running on the expected port.', 'CONNECTION_REFUSED');
      }
      
      if (errorMessage.includes('timeout') || errorMessage.includes('etimedout')) {
        throw new AuthError(504, 'Request to authentication server timed out. Please check your connection and try again.', 'TIMEOUT');
      }
      
      // Generic network error fallback
      throw new AuthError(503, 'Network error occurred while connecting to authentication server. Please check your connection and try again.', 'NETWORK_ERROR');
    }
    
    // Handle AuthError instances (don't re-wrap)
    if (error instanceof AuthError) {
      throw error;
    }
    
    // Handle other unexpected errors
    throw new AuthError(500, 'An unexpected error occurred during signup. Please try again.', 'UNKNOWN_ERROR');
  }
};

export const forgotPassword = async (email: string): Promise<void> => {
  try {
    console.log('Requesting password reset for email:', email);
    console.log('API URL:', `${BASE_URL}/api/auth/forgot-password`);
    
    const response = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    await handleResponse(response);
  } catch (error) {
    console.error('Forgot password error:', error);
    
    // Handle different types of network errors
    if (error instanceof TypeError) {
      const errorMessage = error.message.toLowerCase();
      
      if (errorMessage.includes('fetch') || errorMessage.includes('network request failed')) {
        throw new AuthError(503, 'Unable to connect to authentication server. Please check your internet connection and try again.', 'NETWORK_ERROR');
      }
      
      if (errorMessage.includes('name or service not known') || errorMessage.includes('getaddrinfo')) {
        throw new AuthError(503, 'Authentication server is unreachable. The server may be down or the URL is incorrect. Please contact support if this persists.', 'SERVER_UNREACHABLE');
      }
      
      if (errorMessage.includes('connection refused') || errorMessage.includes('econnrefused')) {
        throw new AuthError(503, 'Connection to authentication server was refused. The server may not be running on the expected port.', 'CONNECTION_REFUSED');
      }
      
      if (errorMessage.includes('timeout') || errorMessage.includes('etimedout')) {
        throw new AuthError(504, 'Request to authentication server timed out. Please check your connection and try again.', 'TIMEOUT');
      }
      
      // Generic network error fallback
      throw new AuthError(503, 'Network error occurred while connecting to authentication server. Please check your connection and try again.', 'NETWORK_ERROR');
    }
    
    // Handle AuthError instances (don't re-wrap)
    if (error instanceof AuthError) {
      throw error;
    }
    
    // Handle other unexpected errors
    throw new AuthError(500, 'An unexpected error occurred during password reset request. Please try again.', 'UNKNOWN_ERROR');
  }
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  try {
    console.log('Resetting password with token');
    console.log('API URL:', `${BASE_URL}/api/auth/reset-password`);
    
    const response = await fetch(`${BASE_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, new_password: newPassword }),
    });

    await handleResponse(response);
  } catch (error) {
    console.error('Reset password error:', error);
    
    // Handle different types of network errors
    if (error instanceof TypeError) {
      const errorMessage = error.message.toLowerCase();
      
      if (errorMessage.includes('fetch') || errorMessage.includes('network request failed')) {
        throw new AuthError(503, 'Unable to connect to authentication server. Please check your internet connection and try again.', 'NETWORK_ERROR');
      }
      
      if (errorMessage.includes('name or service not known') || errorMessage.includes('getaddrinfo')) {
        throw new AuthError(503, 'Authentication server is unreachable. The server may be down or the URL is incorrect. Please contact support if this persists.', 'SERVER_UNREACHABLE');
      }
      
      if (errorMessage.includes('connection refused') || errorMessage.includes('econnrefused')) {
        throw new AuthError(503, 'Connection to authentication server was refused. The server may not be running on the expected port.', 'CONNECTION_REFUSED');
      }
      
      if (errorMessage.includes('timeout') || errorMessage.includes('etimedout')) {
        throw new AuthError(504, 'Request to authentication server timed out. Please check your connection and try again.', 'TIMEOUT');
      }
      
      // Generic network error fallback
      throw new AuthError(503, 'Network error occurred while connecting to authentication server. Please check your connection and try again.', 'NETWORK_ERROR');
    }
    
    // Handle AuthError instances (don't re-wrap)
    if (error instanceof AuthError) {
      throw error;
    }
    
    // Handle other unexpected errors
    throw new AuthError(500, 'An unexpected error occurred during password reset. Please try again.', 'UNKNOWN_ERROR');
  }
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};