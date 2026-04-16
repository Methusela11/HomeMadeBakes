import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(formData);
    if (result.success) {
      setMessage("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage(result.error);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-6 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-orange-600 px-6 py-8 text-white">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <FaUser className="text-4xl text-orange-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <p className="text-orange-100">
                  Member since {new Date(user?.createdAt).getFullYear()}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {message && (
              <div
                className={`p-3 rounded-lg mb-4 ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
              >
                {message}
              </div>
            )}

            {!isEditing ? (
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <label className="text-sm text-gray-500">Full Name</label>
                  <p className="text-gray-800 font-medium">{user?.name}</p>
                </div>
                <div className="border-b pb-3">
                  <label className="text-sm text-gray-500">Email Address</label>
                  <p className="text-gray-800 font-medium">{user?.email}</p>
                </div>
                <div className="border-b pb-3">
                  <label className="text-sm text-gray-500">Phone Number</label>
                  <p className="text-gray-800 font-medium">
                    {user?.phone || "Not provided"}
                  </p>
                </div>

                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition font-semibold"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition font-semibold"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
