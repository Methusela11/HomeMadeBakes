import { useState } from "react";
import { useCart } from "../context/CartContext";
import CartSidebar from "../include/CartSidebar";

export default function FloatingCart() {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <>
      {/* FLOATING CART ICON */}
      <div
        onClick={toggleCart}
        className="fixed bottom-28 sm:bottom-32 right-4 sm:right-6 w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center cursor-pointer z-[9999] shadow-lg hover:scale-110 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 15v6"
          />
        </svg>

        {/* CART COUNT BADGE */}
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </div>

      {/* DARK OVERLAY */}
      {isCartOpen && (
        <div
          onClick={toggleCart}
          className="fixed inset-0 bg-black/50 z-[9998] transition-opacity duration-300"
        />
      )}

      {/* CART SIDEBAR */}
      {isCartOpen && <CartSidebar onClose={toggleCart} />}
    </>
  );
}
