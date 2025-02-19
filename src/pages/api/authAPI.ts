// utils/auth-api.ts

interface AuthResponse {
  success: boolean;
  token?: string;
  token_type?: string;
  user?: {
    email: string;
    hasCompletedOnboarding: boolean;
  };
  error?: string;
  message?: string;
}

interface UserState {
  hasCompletedOnboarding: boolean;
  websiteUrl?: string;
  analysisStatus: string;
  reportsStatus: string;
  lastUpdated: string;
}

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(` http://127.0.0.1:8000/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Failed to sign in');
    }

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

export const signUp = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(` http://127.0.0.1:8000/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Failed to sign up');
    }

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
    const response = await fetch(` http://127.0.0.1:8000/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Failed to process request');
    }

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
    const response = await fetch(` http://127.0.0.1:8000/api/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, new_password: newPassword }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Failed to reset password');
    }

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

export const checkUserState = async (): Promise<UserState | null> => {
  try {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`http://127.0.0.1:8000/api/user/state`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user state');
    }

    const data = await response.json();
    return data.state;
  } catch (error) {
    console.error('Error checking user state:', error);
    return null;
  }
};

export const updateOnboardingStatus = async (completed: boolean): Promise<AuthResponse> => {
  try {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`http://127.0.0.1:8000/api/user/onboarding`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || 'Failed to update onboarding status');
    }

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