import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://127.0.0.1:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error("Login failed");

      localStorage.setItem("jwt", data.data);
      setIsLoggedIn(true);
      navigate("/profile");
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed: Invalid credentials");
    }
  };

  const logout = () => {
    navigate("/login");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
