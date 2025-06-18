export interface UserMetadata {
  name?: string;
  company?: string;
  role?: string;
  [key: string]: unknown;
}

export interface AppMetadata {
  provider: string;
  providers: string[];
}

export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  aud: string;
  role: string;
}

export interface UserProfile {
  id: string;
  name: string;
  has_completed_onboarding: boolean;
  company: string | null;
  role: string;
  roles: string[];
  website_url: string | null;
  analysis_status: string | null;
  current_business_id: string | null;
  created_at: string;
  updated_at: string;
  email?: string;
  hasCompletedOnboarding?: boolean;
}

export interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  user: User;
}

export interface AuthResponse {
  user: User;
  profile: UserProfile;
  session: Session | null;
  message?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  error: string | null;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  name?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  new_password: string;
} 