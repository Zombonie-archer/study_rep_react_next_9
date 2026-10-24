import { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (userData: User | null) => void;
  clearIsAuthenticated: () => void;
}

export const useAuth = create<AuthStore>()(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (userData) => {
        return set({ isAuthenticated: !!userData, user: userData });
      },
      clearIsAuthenticated: () => {
        return set({ isAuthenticated: false, user: null });
      },
    })
);