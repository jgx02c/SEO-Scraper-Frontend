// utils/auth-api.ts
// Define a global base URL
const BASE_URL = 'http://127.0.0.1:8000';

interface AuthResponse {
  success: boolean;
  token?: string;
  token_type?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    hasCompletedOnboarding: boolean;
    company?: string | null;
    role?: string | null;
    roles: string[];
    website_url?: string | null;
    analysis_status?: string | null;
    current_business_id?: string | null;
  };
  error?: string;
  message?: string;
  requires_confirmation?: boolean;
}

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.detail || 'API request failed');
  }
  
  return data;
};

// Helper function to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('jwt_token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return { 'Authorization': `Bearer ${token}` };
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

    // Store JWT token from backend response
    if (data.token) {
      localStorage.setItem('jwt_token', data.token);
    } else {
      throw new Error('No token received from server');
    }

    return {
      success: true,
      token: data.token,
      token_type: data.token_type,
      user: data.user
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

export const signUp = async (email: string, password: string, name?: string): Promise<AuthResponse> => {
  try {
    const userData = { email, password, name };
    
    const response = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await handleResponse(response);

    // If email confirmation is required, return that response
    if (data.requires_confirmation) {
      return {
        success: true,
        message: data.message,
        requires_confirmation: true,
        user: {
          id: data.id,
          email: data.email,
          name: data.name,
          hasCompletedOnboarding: false,
          company: null,
          role: null,
          roles: ['user'],
          website_url: null,
          analysis_status: null,
          current_business_id: null
        }
      };
    }

    // Otherwise, proceed with normal signup flow
    if (data.token) {
      localStorage.setItem('jwt_token', data.token);
    }

    return {
      success: true,
      token: data.token,
      token_type: data.token_type,
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
    const response = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await handleResponse(response);

    return {
      success: true,
      message: data.message
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

export const resetPassword = async (token: string, newPassword: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, new_password: newPassword }),
    });

    const data = await handleResponse(response);

    return {
      success: true,
      message: data.message
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

export const logout = () => {
  localStorage.removeItem('jwt_token');
  // Add any other cleanup needed
};