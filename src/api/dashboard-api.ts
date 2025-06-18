// utils/dashboard-api.ts
// Define global base URL with environment variable support
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export class ApiError extends Error {
  constructor(
    public status: number, 
    message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Helper function to handle API responses with better error information
const handleApiResponse = async (response: Response) => {
  let data;
  try {
    data = await response.json();
  } catch {
    throw new ApiError(
      response.status,
      `Failed to parse response: ${response.statusText}`,
      'PARSE_ERROR'
    );
  }
  
  if (!response.ok) {
    const message = data.detail || data.message || data.error || `HTTP ${response.status}: ${response.statusText}`;
    throw new ApiError(response.status, message, data.code, data);
  }
  
  return data;
};

import type { OverviewResponse } from '@/types/api';
import type { UserProfile } from '@/types/auth';

export const fetchOverviewData = async (): Promise<OverviewResponse> => {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new ApiError(401, 'No authentication token found', 'NO_TOKEN');
  }

  try {
    const response = await fetch(`${BASE_URL}/api/seo/overview`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await handleApiResponse(response);
    
    if (!data.success) {
      return {
        success: false,
        error: data.error || 'Failed to fetch overview data'
      };
    }

    return {
      success: true,
      data: data.report
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, 'Network error occurred', 'NETWORK_ERROR', error);
  }
};

export const api = {
  async validateToken(token: string): Promise<UserProfile> {
    const response = await fetch(`${BASE_URL}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new ApiError(response.status, 'Invalid token');
    }
    
    const data = await response.json();
    if (!data.success) {
      throw new ApiError(401, data.error || 'Invalid token');
    }
    
    return data.user;
  },
  
  async getUserProfile(token: string): Promise<UserProfile> {
    const response = await fetch(`${BASE_URL}/api/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new ApiError(response.status, 'Failed to fetch user profile');
    }
    
    const data = await response.json();
    if (!data.success) {
      throw new ApiError(response.status, data.error || 'Failed to fetch user profile');
    }
    
    return data.profile;
  },
  
  async checkAuth(): Promise<{
    isAuthenticated: boolean;
    profile?: UserProfile;
  }> {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      return { isAuthenticated: false };
    }
    
    try {
      // Run both requests in parallel to get full profile data
      const [authUser, userProfile] = await Promise.all([
        this.validateToken(token),
        this.getUserProfile(token)
      ]);
      
      // Merge auth user data with full profile
      const profile = {
        ...authUser,
        ...userProfile
      };
      
      return { 
        isAuthenticated: true,
        profile
      };
    } catch (error) {
      // If there's an auth error, clear the token
      if (error instanceof ApiError && error.status === 401) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return { isAuthenticated: false };
      }
      throw error; // Re-throw other errors
    }
  },

  async updateUserProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new ApiError(401, 'No authentication token found');
    }

    const response = await fetch(`${BASE_URL}/api/users/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile)
    });

    if (!response.ok) {
      throw new ApiError(response.status, 'Failed to update profile');
    }

    const data = await response.json();
    if (!data.success) {
      throw new ApiError(500, data.error || 'Failed to update profile');
    }

    return data.profile;
  },

  async completeOnboarding(profile: Partial<UserProfile>): Promise<boolean> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new ApiError(401, 'No authentication token found');
    }

    const response = await fetch(`${BASE_URL}/api/users/complete-onboarding`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile)
    });

    if (!response.ok) {
      throw new ApiError(response.status, 'Failed to complete onboarding');
    }

    const data = await response.json();
    return data.success === true;
  },

  async getUserState() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new ApiError(401, 'No authentication token found');
    }

    const response = await fetch(`${BASE_URL}/api/users/state`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new ApiError(response.status, 'Failed to fetch user state');
    }

    const data = await response.json();
    if (!data.success) {
      throw new ApiError(500, data.error || 'Failed to fetch user state');
    }

    return data.state;
  },

  fetchOverviewData,
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};