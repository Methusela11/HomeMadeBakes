import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();
const API_URL = "https://rmeks-bakery-backend.onrender.com/api";

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/auth/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.email.split("@")[0], // Create username from email
          email: userData.email,
          password: userData.password,
          password2: userData.password,
          first_name: userData.name.split(" ")[0],
          last_name: userData.name.split(" ")[1] || "",
          phone: userData.phone || "",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access);
        setToken(data.access);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: Object.values(data).join(", ") };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.access);
        setToken(data.access);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Network error. Please try again." };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/profile/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: userData.name?.split(" ")[0],
          last_name: userData.name?.split(" ")[1] || "",
          email: userData.email,
          phone: userData.phone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        return { success: true };
      } else {
        return { success: false, error: "Update failed" };
      }
    } catch (error) {
      console.error("Update error:", error);
      return { success: false, error: "Network error. Please try again." };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
