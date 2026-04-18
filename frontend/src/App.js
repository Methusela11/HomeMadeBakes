import { Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./include/Navbar";
import Footer from "./include/Footer";
import Whatsapp from "./include/Whatsapp";
import FloatingCart from "./components/FloatingCart";
import ProtectedRoute from "./components/ProtectedRoute";

import BakeryLanding from "./pages/BakeryLanding";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Shop from "./pages/Shop";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";

export default function App() {
  const location = useLocation();

const hideNavbarFooterRoutes = ["/login", "/register"];
const hideFooterRoutes = ["/"];

const hideLayout = hideNavbarFooterRoutes.includes(location.pathname);
const hideFooter = hideFooterRoutes.includes(location.pathname);

  const showCart =
    location.pathname === "/shop" || location.pathname === "/order";

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          {!hideLayout && <Navbar />}

          {/* MAIN CONTENT */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<BakeryLanding />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/order" element={<Order />} />
              <Route path="/contact" element={<Contact />} />

              {/* AUTH */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* PROTECTED ROUTES */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-success"
                element={
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          {!hideLayout && !hideFooter && <Footer />}

          {(location.pathname === "/" || location.pathname === "/contact") && (
            <Whatsapp />
          )}

          {showCart && <FloatingCart />}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
