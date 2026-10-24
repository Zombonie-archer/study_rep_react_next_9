'use client';
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";
import React from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const authStore = useAuth();

  React.useEffect(() => {
    const checkCurrentSession = async () => {
      try {
        const session = await checkSession();
        if (session.success) {
          const user = await getMe();
          authStore.setUser(user);
        } else {
          authStore.clearIsAuthenticated();
        }
      } catch (error) {
        authStore.clearIsAuthenticated();
      }
    };

    checkCurrentSession();
  }, []);

  return <>{children}</>;
}
