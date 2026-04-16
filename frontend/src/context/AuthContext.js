import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();
const API_URL = "https://rmeks-bakery-backend.onrender.com/api";

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const fetchUserProfile = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

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
        // Token invalid
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const register = async (userData) => {
    try {
      console.log(
        "Sending registration request to:",
        `${API_URL}/auth/register/`,
      );
      console.log("Registration data:", userData);

      const response = await fetch(`${API_URL}/auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username:
            userData.email.split("@")[0] + Math.floor(Math.random() * 1000), // Make username unique
          email: userData.email,
          password: userData.password,
          password2: userData.password,
          first_name: userData.name.split(" ")[0],
          last_name: userData.name.split(" ")[1] || "",
          phone: userData.phone || "",
        }),
      });

      const data = await response.json();
      console.log("Registration response status:", response.status);
      console.log("Registration response data:", data);

      if (response.status === 201) {
        // Successfully registered
        localStorage.setItem("token", data.access);
        setToken(data.access);
        setUser(data.user);
        return { success: true };
      } else {
        // Handle errors
        let errorMessage = "Registration failed";
        if (data.password) {
          errorMessage = data.password.join(", ");
        } else if (data.username) {
          errorMessage = data.username.join(", ");
        } else if (data.email) {
          errorMessage = data.email.join(", ");
        } else if (data.error) {
          errorMessage = data.error;
        }
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      console.error("Registration error details:", error);
      return { success: false, error: `Network error: ${error.message}` };
    }
  };

  const login = async (email, password) => {
    try {
      console.log("Sending login request to:", `${API_URL}/auth/login/`);

      const response = await fetch(`${API_URL}/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login response status:", response.status);
      console.log("Login response data:", data);

      if (response.status === 200) {
        localStorage.setItem("token", data.access);
        setToken(data.access);
        setUser(data.user);
        return { success: true };
      } else {
        return { success: false, error: data.error || "Login failed" };
      }
    } catch (error) {
      console.error("Login error details:", error);
      return { success: false, error: `Network error: ${error.message}` };
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
