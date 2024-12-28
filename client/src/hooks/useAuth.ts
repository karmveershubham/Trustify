import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(true);

  useEffect(() => {
    // Fetch user data (replace with real logic)
    const savedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(savedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, logout };
};
