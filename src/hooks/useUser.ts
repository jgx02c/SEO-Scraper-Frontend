import { useState, useCallback } from 'react';
import { api, ApiError } from '@/api/dashboard-api';
import { useToastHelpers } from '@/components/ui/toast';
import type { UserProfile } from '@/types/auth';

interface UseUserState {
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

const INITIAL_STATE: UseUserState = {
  profile: null,
  isLoading: false,
  error: null,
};

export const useUser = () => {
  const [userState, setUserState] = useState<UseUserState>(INITIAL_STATE);
  const { success, error: showError } = useToastHelpers();

  // Update user state
  const updateUserState = useCallback((updates: Partial<UseUserState>) => {
    setUserState(prev => ({ ...prev, ...updates }));
  }, []);

  // Get user profile
  const getUserProfile = useCallback(async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      updateUserState({ error: 'No authentication token found' });
      return null;
    }

    updateUserState({ isLoading: true, error: null });

    try {
      const profile = await api.getUserProfile(token);
      
      updateUserState({
        profile,
        isLoading: false,
        error: null,
      });

      return profile;
    } catch (error) {
      console.error('Get user profile error:', error);
      
      const errorMessage = error instanceof ApiError ? error.message : 'Failed to fetch user profile';
      updateUserState({
        isLoading: false,
        error: errorMessage,
      });

      showError(errorMessage, 'Profile Error');
      return null;
    }
  }, [updateUserState, showError]);

  // Update user profile
  const updateUserProfile = useCallback(async (profileUpdates: Partial<UserProfile>) => {
    updateUserState({ isLoading: true, error: null });

    try {
      const updatedProfile = await api.updateUserProfile(profileUpdates);
      
      updateUserState({
        profile: updatedProfile,
        isLoading: false,
        error: null,
      });

      success('Profile updated successfully', 'Success');
      return updatedProfile;
    } catch (error) {
      console.error('Update user profile error:', error);
      
      const errorMessage = error instanceof ApiError ? error.message : 'Failed to update profile';
      updateUserState({
        isLoading: false,
        error: errorMessage,
      });

      showError(errorMessage, 'Update Failed');
      return null;
    }
  }, [updateUserState, success, showError]);

  // Complete onboarding
  const completeOnboarding = useCallback(async (profileData: Partial<UserProfile>) => {
    updateUserState({ isLoading: true, error: null });

    try {
      const isSuccess = await api.completeOnboarding(profileData);
      
      if (isSuccess) {
        // Refresh profile data
        const updatedProfile = await getUserProfile();
        
        updateUserState({ isLoading: false });
        success('Onboarding completed successfully!', 'Welcome');
        
        return updatedProfile;
      } else {
        throw new Error('Failed to complete onboarding');
      }
    } catch (error) {
      console.error('Complete onboarding error:', error);
      
      const errorMessage = error instanceof ApiError ? error.message : 'Failed to complete onboarding';
      updateUserState({
        isLoading: false,
        error: errorMessage,
      });

      showError(errorMessage, 'Onboarding Failed');
      return null;
    }
  }, [updateUserState, success, showError, getUserProfile]);

  // Get user state
  const getUserState = useCallback(async () => {
    updateUserState({ isLoading: true, error: null });

    try {
      const state = await api.getUserState();
      
      updateUserState({
        isLoading: false,
        error: null,
      });

      return state;
    } catch (error) {
      console.error('Get user state error:', error);
      
      const errorMessage = error instanceof ApiError ? error.message : 'Failed to fetch user state';
      updateUserState({
        isLoading: false,
        error: errorMessage,
      });

      return null;
    }
  }, [updateUserState]);

  // Clear user state
  const clearUserState = useCallback(() => {
    setUserState(INITIAL_STATE);
  }, []);

  // Computed properties
  const hasCompletedOnboarding = userState.profile?.has_completed_onboarding || false;
  const userName = userState.profile?.name || '';
  const userEmail = userState.profile?.email || '';
  const userCompany = userState.profile?.company || '';
  const userRole = userState.profile?.role || '';
  const websiteUrl = userState.profile?.website_url || '';

  return {
    // State
    ...userState,
    
    // Computed properties
    hasCompletedOnboarding,
    userName,
    userEmail,
    userCompany,
    userRole,
    websiteUrl,
    
    // Actions
    getUserProfile,
    updateUserProfile,
    completeOnboarding,
    getUserState,
    clearUserState,
    
    // Utilities
    updateUserState,
  };
}; 