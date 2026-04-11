import { useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

import logo from "../assets/images/logo/RB.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const navLinkClass = ({ isActive }) =>
    `transition duration-300 ${
      isActive
        ? "text-orange-500 font-bold drop-shadow-[0_0_8px_rgba(255,115,0,0.9)] "
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
          <NavLink to="/reservation" className={navLinkClass}>
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
            About
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
        <ul className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 md:hidden text-gray-700 z-50">
          <li onClick={handleClose}>
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
          </li>

          <li onClick={handleClose}>
            <NavLink to="/menu" className={navLinkClass}>
              Menu
            </NavLink>
          </li>

          <li onClick={handleClose}>
            <NavLink to="/reservation" className={navLinkClass}>
              Shop
            </NavLink>
          </li>

          <li onClick={handleClose}>
            <NavLink to="/order" className={navLinkClass}>
              Order
            </NavLink>
          </li>

          <li onClick={handleClose}>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </li>

          <li onClick={handleClose}>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </li>

          <li className="flex items-center gap-2 cursor-pointer">
            <FaUser />
            My Account
          </li>
        </ul>
      )}
    </nav>
  );
}
