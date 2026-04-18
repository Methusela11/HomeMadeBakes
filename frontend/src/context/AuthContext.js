import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_URL = "https://rmeks-bakery-backend.onrender.com/api/auth";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  // Configure axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/profile/`);
          setUser(response.data);
        } catch (error) {
          console.error("Error loading user:", error);
          // If token is invalid, clear it
          if (error.response?.status === 401) {
            logout();
          }
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      console.log("Attempting login with:", { email });

      const response = await axios.post(`${API_URL}/login/`, {
        email: email,
        password: password,
      });

      console.log("Login response:", response.data);

      const { access, refresh, user } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      setToken(access);
      setUser(user);

      return { success: true };
    } catch (error) {
      console.error("Login error details:", error.response?.data);

      let errorMessage = "Login failed. Please check your credentials.";

      if (error.response?.data) {
        // Handle different error response formats
        if (typeof error.response.data === "string") {
          errorMessage = error.response.data;
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else if (error.response.data.non_field_errors) {
          errorMessage = error.response.data.non_field_errors[0];
        } else if (error.response.data.email) {
          errorMessage = error.response.data.email[0];
        } else if (error.response.data.password) {
          errorMessage = error.response.data.password[0];
        }
      }

      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      // Create a valid username from name or email
      let username = userData.name || userData.email.split("@")[0];

      // Remove spaces and special characters, keep only letters, numbers, dots, underscores
      username = username.replace(/\s/g, "").replace(/[^a-zA-Z0-9@._-]/g, "");

      // Ensure username is not empty
      if (!username || username.length === 0) {
        username = `user_${Date.now()}`;
      }

      // Ensure username is not too long (max 150 chars)
      if (username.length > 150) {
        username = username.substring(0, 150);
      }

      console.log("Registering with:", {
        email: userData.email,
        username: username,
        phone: userData.phone,
      });

      const response = await axios.post(`${API_URL}/register/`, {
        email: userData.email,
        username: username,
        phone: userData.phone,
        password: userData.password,
        password2: userData.password,
      });

      console.log("Registration success:", response.data);

      // Don't automatically log in - just return success
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error.response?.data);

      let errorMessage = "Registration failed. Please try again.";

      if (error.response?.data) {
        const errors = error.response.data;

        if (errors.username) {
          errorMessage = errors.username[0];
        } else if (errors.email) {
          errorMessage = errors.email[0];
        } else if (errors.password) {
          errorMessage = errors.password[0];
        } else if (errors.non_field_errors) {
          errorMessage = errors.non_field_errors[0];
        } else if (typeof errors === "string") {
          errorMessage = errors;
        }
      }

      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      if (refresh_token) {
        await axios.post(`${API_URL}/logout/`, { refresh: refresh_token });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setToken(null);
      setUser(null);
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
