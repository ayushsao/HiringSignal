import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("hs_token"));

  // Setup axios interceptor
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Load user on mount
  useEffect(() => {
    async function loadUser() {
      if (token) {
        try {
          const res = await axios.get("http://localhost:5000/api/auth/me");
          setUser(res.data.user);
        } catch (error) {
          console.error("Failed to load user:", error);
          logout();
        }
      }
      setLoading(false);
    }
    loadUser();
  }, [token]);

  async function signup(name, email, password) {
    const res = await axios.post("http://localhost:5000/api/auth/signup", {
      name,
      email,
      password,
    });
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem("hs_token", res.data.token);
    return res.data;
  }

  async function login(email, password) {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });
    setToken(res.data.token);
    setUser(res.data.user);
    localStorage.setItem("hs_token", res.data.token);
    return res.data;
  }

  function logout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem("hs_token");
    delete axios.defaults.headers.common["Authorization"];
  }

  async function refreshUser() {
    if (token) {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/me");
        setUser(res.data.user);
      } catch (error) {
        console.error("Failed to refresh user:", error);
      }
    }
  }

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    refreshUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
