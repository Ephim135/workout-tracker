import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  userId: number | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_API_URL + "/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        },
      );

      if (!res.ok) throw new Error("Login failed");
      const data = await res.json();

      setIsLoggedIn(true);
      setUserId(data.user.id);
      navigate("/profileForm");
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed: Invalid credentials");
    }
  };

  const logout = () => {
    // send to backend to logout the user
    navigate("/login");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
