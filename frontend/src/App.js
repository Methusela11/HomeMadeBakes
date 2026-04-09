//App.js
import { Routes, Route } from "react-router-dom";

import Navbar from "./include/Navbar";
import BakeryLanding from "./pages/BakeryLanding";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Reservation from "./pages/Reservation";
import Order from "./pages/Order";
import Contact from "./pages/Contact";

export default function App() {
  return (
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
        path="/reservation"
        element={
          <>
            <Navbar />
            <Reservation />
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
  );
}
