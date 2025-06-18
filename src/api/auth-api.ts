// utils/auth-api.ts
// Define a global base URL with environment variable support
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

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
  let data;
  try {
    data = await response.json();
  } catch {
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
    const response = await fetch(`${BASE_URL}/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(response);
    console.log('Sign in response:', {
      hasSession: !!data.session,
      hasAccessToken: !!data.session?.access_token,
      tokenLength: data.session?.access_token?.length,
      tokenFormat: data.session?.access_token ? `${data.session.access_token.substring(0, 10)}...` : 'none'
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
    throw error;
  }
};

export const signUp = async (email: string, password: string, name?: string): Promise<AuthResponse> => {
  try {
    const userData = { email, password, name };
    console.log('Attempting to sign up user with email:', email);
    
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log('Sign up response:', {
      hasUser: !!data.user,
      hasSession: !!data.session,
      message: data.message
    });
    
    if (!response.ok) {
      throw new Error(data.detail || data.message || 'Signup failed');
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
    throw error;
  }
};

export const forgotPassword = async (email: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  await handleResponse(response);
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/api/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, new_password: newPassword }),
  });

  await handleResponse(response);
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};