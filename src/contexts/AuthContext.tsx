
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthState, User, LoginCredentials, RegisterUserData } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

// Mock data for MVP demonstration
const MOCK_USERS = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'password',
    name: 'John Doe',
    role: 'user' as const,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'business@example.com',
    password: 'password',
    name: 'Business Owner',
    role: 'business' as const,
    createdAt: new Date().toISOString(),
  },
];

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (userData: RegisterUserData) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing auth in localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setAuthState({
          user: parsedUser,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
    
    setAuthState(prev => ({ ...prev, isLoading: false }));
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    // For MVP, simulate API call with timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = MOCK_USERS.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (user) {
          // Remove password before storing
          const { password, ...secureUser } = user;
          
          setAuthState({
            user: secureUser,
            isAuthenticated: true,
            isLoading: false,
          });
          
          localStorage.setItem('currentUser', JSON.stringify(secureUser));
          toast({
            title: 'Login Successful',
            description: `Welcome back, ${secureUser.name}!`,
          });
          resolve(true);
        } else {
          toast({
            title: 'Login Failed',
            description: 'Invalid email or password',
            variant: 'destructive',
          });
          resolve(false);
        }
      }, 800);
    });
  };

  const register = async (userData: RegisterUserData): Promise<boolean> => {
    // For MVP, simulate API call with timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if user already exists
        const userExists = MOCK_USERS.some((u) => u.email === userData.email);
        
        if (userExists) {
          toast({
            title: 'Registration Failed',
            description: 'Account with this email already exists',
            variant: 'destructive',
          });
          resolve(false);
          return;
        }
        
        // Create new user
        const newUser = {
          id: `${MOCK_USERS.length + 1}`,
          email: userData.email,
          name: userData.name,
          role: userData.role,
          createdAt: new Date().toISOString(),
        };
        
        // Simulate saving user to database
        MOCK_USERS.push({ ...newUser, password: userData.password });
        
        setAuthState({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        });
        
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        toast({
          title: 'Registration Successful',
          description: `Welcome to EventBliss Connect, ${newUser.name}!`,
        });
        
        resolve(true);
      }, 800);
    });
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        isAuthenticated: authState.isAuthenticated,
        isLoading: authState.isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
