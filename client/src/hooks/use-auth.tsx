import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface User {
  _id: string;
  username: string;
  email: string;
  userType: 'individual' | 'ngo';
  name: string;
  bio?: string;
  location?: string;
  skills?: string[];
  organizationName?: string;
  contactPhone?: string;
  address?: string;
  serviceTypes?: string[];
  operatingHours?: string;
  website?: string;
  events: string[];
  opportunities: string[];
  createdAt: string;
  updatedAt: string;
}

interface LoginData {
  username: string;
  password: string;
}

interface RegisterData extends LoginData {
  email: string;
  userType: 'individual' | 'ngo';
  name: string;
  [key: string]: any;
}

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<any, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<any, Error, RegisterData>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();

  const {
    data: user,
    error,
    isLoading,
    refetch: refetchProfile
  } = useQuery<User | null, Error>({
    queryKey: ["/api/users/profile"],
    queryFn: async () => {
      try {
        return await apiRequest("GET", "/api/users/profile");
      } catch (error) {
        if (error instanceof Error && error.message === "Unauthorized") {
          return null;
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      const response = await apiRequest("POST", "/api/users/login", credentials);
      localStorage.setItem('token', response.token);
      return response.user;
    },
    onSuccess: async (user: User) => {
      await refetchProfile();
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (registerData: RegisterData) => {
      const response = await apiRequest("POST", "/api/users/register", registerData);
      localStorage.setItem('token', response.token);
      return response.user;
    },
    onSuccess: async (user: User) => {
      await refetchProfile();
      toast({
        title: "Welcome!",
        description: "Your account has been created successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      localStorage.removeItem('token');
      queryClient.clear();
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/users/profile"], null);
      toast({
        title: "Goodbye!",
        description: "You have been logged out successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
