import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

import logo from "../assets/images/logo/RMB.png";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 relative overflow-hidden">
      {/* ORANGE SHAPES */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-20 translate-y-20"></div>

      {/* CARD */}
      <div className="relative z-10 bg-white w-full max-w-md mx-4 rounded-3xl shadow-xl p-8">
        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="logo"
            className="w-28 h-28 object-contain hover:scale-125"
          />
        </div>

        {/* TITLE */}
        <h2 className="text-center text-2xl font-bold text-green-700 mb-8">
          Welcome Back!
        </h2>

        {/* ERROR */}
        {error && (
          <div className="text-red-600 text-sm text-center mb-4">{error}</div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* EMAIL */}
          <div className="border-b border-gray-400 flex items-center gap-3 py-2">
            <FaUser className="text-green-800" />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email or Username"
              className="w-full bg-transparent outline-none placeholder-gray-500"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="border-b border-gray-400 flex items-center gap-3 py-2">
            <FaLock className="text-green-800" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full bg-transparent outline-none placeholder-gray-500"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </button>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-black">
              Forgot Password?
            </Link>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold text-lg shadow-md hover:bg-orange-600 transition"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        {/* SIGN UP */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-green-700 font-bold">
              SIGN UP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
