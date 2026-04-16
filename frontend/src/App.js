import { Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Navbar from "./include/Navbar";
import Footer from "./include/Footer";
import Whatsapp from "./include/Whatsapp";
import FloatingCart from "./components/FloatingCart";

import BakeryLanding from "./pages/BakeryLanding";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Shop from "./pages/Shop";
import Order from "./pages/Order";
import Contact from "./pages/Contact";

export default function App() {
  const location = useLocation();

  // Show cart on all pages except homepage
  const showCart = location.pathname !== "/";

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT PUSHES FOOTER DOWN */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<BakeryLanding />} />
            <Route path="/about" element={<About />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/order" element={<Order />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* FOOTER ALWAYS AT BOTTOM */}
        <Footer />

        {/* ✅ WhatsApp only on homepage */}
        {location.pathname === "/" && <Whatsapp />}

        {/* 🛒 Floating Cart - show on all pages except homepage */}
        {showCart && <FloatingCart />}
      </div>
    </CartProvider>
  );
}
