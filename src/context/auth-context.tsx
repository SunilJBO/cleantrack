import { createContext, useState, useCallback } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import type { Doc } from "../../convex/_generated/dataModel";

type Staff = Doc<"staff">;

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
  const allStaff = useQuery(api.staff.list);

  const login = useCallback(
    (pin: string) => {
      const staff = allStaff?.find((s) => s.pin === pin);
      if (staff) {
        setCurrentStaff(staff);
        return true;
      }
      return false;
    },
    [allStaff]
  );

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
