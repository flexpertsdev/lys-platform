export enum UserRole {
  RETAILER = 'RETAILER',
  BRAND_REP = 'BRAND_REP',
  ADMIN = 'ADMIN',
  TEAM_MEMBER = 'TEAM_MEMBER'
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  companyName?: string;
  phoneNumber?: string;
  photoURL?: string;
  emailVerified: boolean;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  preferences?: UserPreferences;
  metadata?: Record<string, any>;
}

export interface UserPreferences {
  language: 'en' | 'ko' | 'zh';
  currency: 'USD' | 'EUR' | 'GBP' | 'KRW';
  notifications: {
    email: boolean;
    orderUpdates: boolean;
    newProducts: boolean;
    promotions: boolean;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  displayName: string;
  companyName: string;
  role: UserRole;
  invitationToken?: string;
}

export interface Invitation {
  id: string;
  email: string;
  role: UserRole;
  token: string;
  expiresAt: Date;
  createdBy: string;
  createdAt: Date;
  acceptedAt?: Date;
  status: 'pending' | 'accepted' | 'expired';
}