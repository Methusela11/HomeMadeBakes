import { useCart } from "../context/CartContext";

export default function CartSidebar({ onClose }) {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCart();

  const formatPrice = (price) => {
    return `KES ${parseFloat(price).toLocaleString()}`;
  };

  return (
    <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-[9999] flex flex-col">
      {/* HEADER */}
      <div className="bg-orange-600 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 text-2xl"
        >
          ✕
        </button>
      </div>

      {/* CART ITEMS */}
      <div className="flex-1 overflow-y-auto p-4">
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <p>Your cart is empty</p>
            <p className="text-sm mt-2">
              Add some delicious items to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                {/* Product Image */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-orange-600 font-bold text-sm">
                    {formatPrice(item.price)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 bg-gray-200 rounded-full hover:bg-gray-300 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal & Remove */}
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-xs mt-2 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      {cartItems.length > 0 && (
        <div className="border-t p-4 bg-gray-50">
          <div className="flex justify-between mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-orange-600 text-lg">
              {formatPrice(getCartTotal())}
            </span>
          </div>

          <div className="space-y-2">
            <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition font-semibold">
              Proceed to Checkout
            </button>

            <button
              onClick={clearCart}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition text-sm"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
