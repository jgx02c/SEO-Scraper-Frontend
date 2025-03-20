// utils/dashboard-api.ts
import { UserProfile } from '@/types/dashboard';

// Define global base URL
const BASE_URL = 'http://127.0.0.1:8000';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

interface SeoReportData {
  business_id: string;
  report_date: string;
  filename: string;
  insights_count: {
    "Immediate Action Required": number;
    "Needs Attention": number;
    "Good Practice": number;
  };
  total_insights: number;
  page_reports: Array<{
    website_url: string;
    insights_count: {
      "Immediate Action Required": number;
      "Needs Attention": number;
      "Good Practice": number;
    };
    error_citations: Array<any>;
  }>;
}

interface OverviewResponse {
  success: boolean;
  data?: SeoReportData;
  error?: string;
}

export const fetchOverviewData = async (): Promise<OverviewResponse> => {
  const token = localStorage.getItem('jwt_token');
  if (!token) {
    throw new ApiError(401, 'No authentication token found');
  }

  const response = await fetch(`${BASE_URL}/api/seo/overview`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new ApiError(response.status, 'Failed to fetch overview data');
  }

  const data = await response.json();
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
    const token = localStorage.getItem('jwt_token');
    
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
        localStorage.removeItem('jwt_token');
        return { isAuthenticated: false };
      }
      throw error; // Re-throw other errors
    }
  },

  async updateUserProfile(profile: Partial<UserProfile>): Promise<UserProfile> {
    const token = localStorage.getItem('jwt_token');
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
    const token = localStorage.getItem('jwt_token');
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
    const token = localStorage.getItem('jwt_token');
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