import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

import logo from "../assets/images/logo/RB.png";

export default function Footer() {
  return (
    <footer className=" bg-orange-100 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* BRAND */}
          <div>
            <Link to="/" className="text-2xl font-bold cursor-pointer">
              <img
                src={logo}
                alt="Chef portrait"
                className="w-[110px] rounded-2xl object-cover transition-transform duration-300 hover:scale-125"
              />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed pt-5">
              We bake fresh cakes, cookies, bread, and chocolates daily. Your
              happiness is our recipe.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-900">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-500 text-sm">
              <li>
                <Link to="/" className="hover:text-green-900">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-green-900">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-green-900">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/order" className="hover:text-green-900">
                  Order
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-green-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-900">
              Contact
            </h3>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt /> Kilifi, Kenya
              </li>
              <li className="flex items-center gap-2">
                <FaPhone /> +254 110 440 006 / +254 746 688 304
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope /> rmeksbakery@gmail.com
              </li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-900">
              Follow Us
            </h3>
            <div className="flex gap-4 text-xl text-gray-500">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-900"
              >
                <FaFacebook />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-900"
              >
                <FaLinkedin />
              </a>

              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-900"
              >
                <FaWhatsapp />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-900"
              >
                <FaInstagram />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-900"
              >
                <FaTwitter />
              </a>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              All Celebrations Deserve a Perfect Cake.
            </p>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-green-700 mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Sweet Bakery. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
