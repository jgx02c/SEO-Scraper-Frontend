// utils/auth-api.ts
// Define a global base URL
const BASE_URL = 'http://127.0.0.1:8000';

interface AuthResponse {
  success: boolean;
  token?: string;
  token_type?: string;
  user?: {
    id?: string;
    email: string;
    hasCompletedOnboarding: boolean;
    roles?: string[];
  };
  error?: string;
  message?: string;
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

    // Store JWT token
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

    // Store JWT token
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