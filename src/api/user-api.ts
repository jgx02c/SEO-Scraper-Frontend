// utils/user-api.ts
import { UserProfile } from '@/types/dashboard';

// Define global base URL
const BASE_URL = 'http://127.0.0.1:8000';

interface UserState {
  hasCompletedOnboarding: boolean;
  websiteUrl?: string;
  analysisStatus: string;
  reportsStatus: string;
  lastUpdated: string;
}

interface UserProfileResponse {
  success: boolean;
  profile?: UserProfile;
  error?: string;
  message?: string;
}

interface UserStateResponse {
  success: boolean;
  state?: UserState;
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
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No authentication token found');
  }
  return { 'Authorization': `Bearer ${token}` };
};

export const checkUserState = async (): Promise<UserStateResponse> => {
  try {
    const headers = getAuthHeader();
    
    const response = await fetch(`${BASE_URL}/api/users/state`, {
      method: 'GET',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include'
    });

    const data = await handleResponse(response);
    
    return {
      success: true,
      state: data.state
    };
  } catch (error) {
    console.error('Error checking user state:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

export const getUserProfile = async (): Promise<UserProfileResponse> => {
  try {
    const headers = getAuthHeader();
    
    const response = await fetch(`${BASE_URL}/api/users/profile`, {
      headers
    });

    const data = await handleResponse(response);
    
    return {
      success: true,
      profile: data.profile
    };
  } catch (error) {
    console.error('Error getting user profile:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

export const updateUserProfile = async (profile: Partial<UserProfile>): Promise<UserProfileResponse> => {
  try {
    const headers = {
      ...getAuthHeader(),
      'Content-Type': 'application/json'
    };
    
    const response = await fetch(`${BASE_URL}/api/users/profile`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(profile),
    });

    const data = await handleResponse(response);

    return {
      success: true,
      profile: data.profile
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

export const updateOnboardingStatus = async (completed: boolean): Promise<UserStateResponse> => {
  try {
    const headers = {
      ...getAuthHeader(),
      'Content-Type': 'application/json'
    };

    const response = await fetch(`${BASE_URL}/api/users/onboarding`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ completed }),
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

export const completeOnboarding = async (profile: Partial<UserProfile>): Promise<UserStateResponse> => {
  try {
    const headers = {
      ...getAuthHeader(),
      'Content-Type': 'application/json'
    };

    const response = await fetch(`${BASE_URL}/api/users/complete-onboarding`, {
      method: 'POST',
      headers,
      body: JSON.stringify(profile),
    });

    const data = await handleResponse(response);

    return {
      success: true,
      state: data.state
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};