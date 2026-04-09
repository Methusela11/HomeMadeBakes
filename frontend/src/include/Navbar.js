import { useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 md:px-12 py-6 bg-white shadow-md">
      <h1 className="text-2xl font-bold">
        <span className="text-orange-500">RMEKS </span>Bakery
      </h1>

      <ul className="hidden md:flex gap-8 text-gray-700">
        <li className="cursor-pointer hover:text-orange-500">Home</li>
        <li className="cursor-pointer hover:text-orange-500">About</li>
        <li className="cursor-pointer hover:text-orange-500">Menu</li>
        <li className="cursor-pointer hover:text-orange-500">Reservation</li>
        <li className="cursor-pointer hover:text-orange-500">Order</li>
        <li className="cursor-pointer hover:text-orange-500">Contact</li>
      </ul>

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
        <ul className="absolute top-20 left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 md:hidden text-gray-700">
          <li>Home</li>
          <li>About</li>
          <li>Menu</li>
          <li>Reservation</li>
          <li>Order</li>
          <li>Contact</li>
          <li className="flex items-center gap-2">
            <FaUser />
            My Account
          </li>
        </ul>
      )}
    </nav>
  );
}
