import { createContext, useState, useCallback } from "react";
import type { Staff } from "../types";
import { getStaffByPin } from "../data";

interface AuthContextType {
  currentStaff: Staff | null;
  login: (pin: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  currentStaff: null,
  login: () => false,
  logout: () => {},
  isAuthenticated: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentStaff, setCurrentStaff] = useState<Staff | null>(null);

  const login = useCallback((pin: string) => {
    const staff = getStaffByPin(pin);
    if (staff) {
      setCurrentStaff(staff);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setCurrentStaff(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentStaff,
        login,
        logout,
        isAuthenticated: currentStaff !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
