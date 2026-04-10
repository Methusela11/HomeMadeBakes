import { useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

import logo from "../assets/images/logo/RB.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-white shadow-md">
      <Link to="/" className="text-2xl font-bold cursor-pointer">
        <img
          src={logo}
          alt="Chef portrait"
          className="w-[130px] rounded-2xl object-cover transition-transform duration-300 hover:scale-105"
        />
        {/* <span className="text-orange-500">RMEKS </span>Bakery */}
      </Link>
      {/* DESKTOP MENU */}
      <ul className="hidden md:flex gap-8 text-gray-700">
        <li>
          <Link to="/" className="hover:text-orange-500">
            Home
          </Link>
        </li>

        <li>
          <Link to="/menu" className="hover:text-orange-500">
            Menu
          </Link>
        </li>
        <li>
          <Link to="/reservation" className="hover:text-orange-500">
            Reservation
          </Link>
        </li>
        <li>
          <Link to="/order" className="hover:text-orange-500">
            Order
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-orange-500">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-orange-500">
            About
          </Link>
        </li>
      </ul>
      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-sm cursor-pointer">
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
            <Link to="/">Home</Link>
          </li>

          <li onClick={handleClose}>
            <Link to="/menu">Menu</Link>
          </li>

          <li onClick={handleClose}>
            <Link to="/reservation">Reservation</Link>
          </li>

          <li onClick={handleClose}>
            <Link to="/order">Order</Link>
          </li>

          <li onClick={handleClose}>
            <Link to="/contact">Contact</Link>
          </li>
          <li onClick={handleClose}>
            <Link to="/about">About</Link>
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
