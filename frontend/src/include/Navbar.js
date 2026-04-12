import { useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import {
  FaHome,
  FaUtensils,
  FaShoppingBag,
  FaShoppingCart,
  FaEnvelope,
  FaInfoCircle,
} from "react-icons/fa";

import logo from "../assets/images/logo/RMB.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const navLinkClass = ({ isActive }) =>
    `transition duration-300 ${
      isActive
        ? "text-orange-500 font-bold drop-shadow-[0_0_8px_rgba(255,115,0,0.9)]"
        : "hover:text-orange-500 hover:font-bold"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-white shadow-md">
      <Link to="/" className="text-2xl font-bold cursor-pointer">
        <img
          src={logo}
          alt="Chef portrait"
          className="w-[110px] rounded-2xl object-cover transition-transform duration-300 hover:scale-125"
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
        <div className="hidden md:flex items-center gap-2 text-sm cursor-pointer hover:text-orange-500 hover:font-bold">
          <FaUser />
          <span>My Account</span>
        </div>

        <button
          className="md:hidden text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isOpen && (
        <ul className="absolute top-20 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-5 py-6 md:hidden text-gray-800 z-50">
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
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}

          {/* My Account */}
          <li className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
            <FaUser />
            My Account
          </li>
        </ul>
      )}
    </nav>
  );
}
