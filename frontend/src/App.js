//App.js
import { Routes, Route } from "react-router-dom";

import Navbar from "./include/Navbar";
import BakeryLanding from "./pages/BakeryLanding";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Shop from "./pages/Shop";
import Order from "./pages/Order";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="overflow-x-hidden">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <BakeryLanding />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
            </>
          }
        />

        <Route
          path="/menu"
          element={
            <>
              <Navbar />
              <Menu />
            </>
          }
        />

        <Route
          path="/shop"
          element={
            <>
              <Navbar />
              <Shop />
            </>
          }
        />

        <Route
          path="/order"
          element={
            <>
              <Navbar />
              <Order />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
            </>
          }
        />
      </Routes>
    </div>
  );
}
