import { UserProfile } from '@/types/dashboard';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = {
  async validateToken(token: string): Promise<UserProfile> {
    const response = await fetch('https://scope-fastapi-194s.onrender.com/api/auth/validate', {
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
    const response = await fetch('https://scope-fastapi-194s.onrender.com/api/user/profile', {
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
  }
};