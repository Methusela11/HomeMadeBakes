import { useState } from "react";
import {
  FaUser,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUtensils,
  FaShoppingBag,
  FaShoppingCart,
  FaEnvelope,
  FaInfoCircle,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/logo/RMB.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => setIsOpen(false);
  const handleLogout = () => {
    logout();
    navigate("/");
    setIsDropdownOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `transition duration-300 ${
      isActive
        ? "text-orange-500 font-bold drop-shadow-[0_0_8px_rgba(255,115,0,0.9)]"
        : "hover:text-orange-500 hover:font-bold"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-12 py-3 md:py-5 bg-white shadow-md transition-all duration-300">
      <Link to="/" className="text-2xl font-bold cursor-pointer">
        <img
          src={logo}
          alt="Chef portrait"
          className="w-[100px] md:w-[110px] rounded-2xl object-cover transition-transform duration-300 hover:scale-125"
        />
      </Link>

      <ul className="hidden md:flex gap-8 text-gray-700">
        <li>
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/menu" className={navLinkClass}>
            Menu
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop" className={navLinkClass}>
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink to="/order" className={navLinkClass}>
            Order
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={navLinkClass}>
            About Us
          </NavLink>
        </li>
      </ul>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {/* Authentication Section */}
        <div className="relative">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-sm cursor-pointer hover:text-orange-500 hover:font-bold"
              >
                <FaUserCircle className="text-xl" />
                <span className="hidden md:inline">
                  {user?.name?.split(" ")[0]}
                </span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50">
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-semibold text-gray-700">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t"
                    >
                      <span className="flex items-center gap-2">
                        <FaSignOutAlt /> Logout
                      </span>
                    </button>
                  </div>
                </>
              )}
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-6 text-sm cursor-pointer hover:text-orange-500 hover:font-bold"
            >
              <FaUser />
              <span className="hidden md:inline">My Account</span>
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="absolute top-16 md:top-20 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-4 py-5 md:hidden text-gray-800 z-50">
          {[
            { to: "/", label: "Home", icon: <FaHome />, end: true },
            { to: "/menu", label: "Menu", icon: <FaUtensils /> },
            { to: "/shop", label: "Shop", icon: <FaShoppingBag /> },
            { to: "/order", label: "Order", icon: <FaShoppingCart /> },
            { to: "/contact", label: "Contact", icon: <FaEnvelope /> },
            { to: "/about", label: "About Us", icon: <FaInfoCircle /> },
          ].map((item, i) => (
            <li key={i} onClick={handleClose}>
              <NavLink to={item.to} end={item.end} className={navLinkClass}>
                <span className="flex items-center gap-3 text-lg">
                  {item.icon}
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}

          {/* Mobile Auth Section */}
          {isAuthenticated ? (
            <>
              <li className="flex items-center gap-2 cursor-pointer">
                <FaUserCircle className="text-xl" />
                {user?.name}
              </li>
              <li>
                <button
                  onClick={() => {
                    logout();
                    handleClose();
                  }}
                  className="flex items-center gap-2 text-red-600"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </>
          ) : (
            <li onClick={handleClose}>
              <Link
                to="/login"
                className="flex items-center gap-2 cursor-pointer hover:text-orange-500"
              >
                <FaUser />
                My Account
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
