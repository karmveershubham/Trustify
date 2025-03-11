'use client';
import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {User, AuthContextType} from "@/lib/types";

// Create AuthContext with default values
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

   const fetchUserProfile = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    if (Cookies.get("is_auth")) {
      fetchUserProfile();
    }
  }, []);

  // Centralized logout function
  const logout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      Cookies.remove("is_auth");
      setUser(null);
      router.push("/login"); 
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("Logout failed. Please try again.");

    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
