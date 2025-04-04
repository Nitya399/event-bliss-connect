
export type UserRole = 'user' | 'business';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Business {
  id: string;
  ownerId: string;
  name: string;
  category: string;
  description: string;
  location: string;
  smallEventPrice: number;
  largeEventPrice: number;
  contactEmail: string;
  contactPhone: string;
  yearsOfExperience: number;
  profileImage?: string; 
  coverImage?: string;
  gallery?: string[];
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface BusinessRegisterData {
  name: string;
  category: string;
  description: string;
  location: string;
  smallEventPrice: number;
  largeEventPrice: number;
  contactEmail: string;
  contactPhone: string;
  yearsOfExperience: number;
}
