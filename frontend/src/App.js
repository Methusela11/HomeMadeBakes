import { Routes, Route } from "react-router-dom";

import Navbar from "./include/Navbar";
import Footer from "./include/Footer";

import BakeryLanding from "./pages/BakeryLanding";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Shop from "./pages/Shop";
import Order from "./pages/Order";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* NAVBAR ALWAYS ON TOP */}
      <Navbar />

      {/* PAGE CONTENT */}
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

      <Footer />
    </div>
  );
}
