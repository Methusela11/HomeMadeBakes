import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";

import logo from "../assets/images/logo/RMB.png";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    if (formData.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    if (!formData.name.trim()) {
      return setError("Full name is required");
    }

    if (!formData.email.trim()) {
      return setError("Email is required");
    }

    if (!formData.phone.trim()) {
      return setError("Phone number is required");
    }

    setLoading(true);
    setError("");

    const result = await register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });

    if (result.success) {
      setShowSuccess(true);
      // Redirect to login after 2 seconds with welcome message
      setTimeout(() => {
        navigate("/login", {
          state: {
            welcomeMessage:
              "Account created successfully! Please login with your credentials.",
            email: formData.email,
          },
        });
      }, 2000);
    } else {
      setError(result.error || "Registration failed");
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md text-center">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-900 mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-4">
            Your account has been created successfully.
          </p>
          <p className="text-gray-500 text-sm">Redirecting to login page...</p>
          <div className="mt-4 w-full bg-orange-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-orange-600 h-2 rounded-full animate-pulse"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-20 translate-y-20"></div>

      {/* CARD */}
      <div className="relative z-10 bg-white w-full max-w-md mx-4 rounded-3xl shadow-xl p-8">
        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="logo"
            className="w-28 h-28 object-contain hover:scale-125 transition-transform"
          />
        </div>

        {/* TITLE */}
        <h2 className="text-center text-2xl font-bold text-green-900 mb-6">
          Create Account
        </h2>

        {/* ERROR */}
        {error && (
          <div className="text-red-600 text-sm text-center mb-4 p-2 bg-red-50 rounded">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* NAME */}
          <div className="border-b border-gray-400 flex items-center gap-3 py-2">
            <FaUser className="text-green-900" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full bg-transparent outline-none placeholder-gray-500"
              required
            />
          </div>

          {/* EMAIL */}
          <div className="border-b border-gray-400 flex items-center gap-3 py-2">
            <FaEnvelope className="text-green-900" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full bg-transparent outline-none placeholder-gray-500"
              required
            />
          </div>

          {/* PHONE */}
          <div className="border-b border-gray-400 flex items-center gap-3 py-2">
            <FaPhone className="text-green-900" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full bg-transparent outline-none placeholder-gray-500"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="border-b border-gray-400 flex items-center gap-3 py-2">
            <FaLock className="text-green-900" />
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
              className="focus:outline-none"
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-500" />
              ) : (
                <FaEye className="text-gray-500" />
              )}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="border-b border-gray-400 flex items-center gap-3 py-2">
            <FaLock className="text-green-900" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full bg-transparent outline-none placeholder-gray-500"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-xl font-bold text-lg shadow-md hover:bg-orange-700 hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "SIGN UP"}
          </button>
        </form>

        {/* LOGIN LINK */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-900 font-bold hover:underline"
            >
              LOGIN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
