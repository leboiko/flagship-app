import { create } from 'zustand';
import { User } from '../types';
import { currentUser } from '../data/mock';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (method: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async (_method: string) => {
    set({ isLoading: true });
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    set({ user: currentUser, isAuthenticated: true, isLoading: false });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
}));
