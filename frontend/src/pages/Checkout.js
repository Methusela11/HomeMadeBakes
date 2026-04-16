import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    deliveryDate: "",
    deliveryTime: "",
    specialInstructions: "",
    paymentMethod: "mpesa",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const formatPrice = (price) => {
    return `KES ${parseFloat(price).toLocaleString()}`;
  };

  const subtotal = getCartTotal();
  const deliveryFee = subtotal > 0 ? 150 : 0;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before checkout.");
      navigate("/shop");
      return;
    }

    setIsSubmitting(true);

    // Prepare order data
    const orderData = {
      customer: formData,
      items: cartItems,
      subtotal: subtotal,
      deliveryFee: deliveryFee,
      total: total,
      orderDate: new Date().toISOString(),
      status: "pending",
    };

    try {
      // Send order to backend (if you have an endpoint)
      const response = await fetch(
        "https://rmeks-bakery-backend.onrender.com/api/orders/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        },
      );

      if (response.ok) {
        setOrderSuccess(true);
        clearCart();

        // Send WhatsApp message with order details
        sendWhatsAppOrderConfirmation(orderData);

        setTimeout(() => {
          navigate("/order-success");
        }, 3000);
      } else {
        throw new Error("Failed to place order");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("There was an error processing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendWhatsAppOrderConfirmation = (orderData) => {
    const message = `*New Order from RMEKS Bakery*%0A%0A
*Customer Details*%0A
Name: ${orderData.customer.fullName}%0A
Phone: ${orderData.customer.phone}%0A
Email: ${orderData.customer.email}%0A
Address: ${orderData.customer.address}, ${orderData.customer.city}%0A
Delivery: ${orderData.customer.deliveryDate} at ${orderData.customer.deliveryTime}%0A%0A
*Order Items*%0A
${orderData.items.map((item) => `- ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`).join("%0A")}%0A%0A
*Payment Summary*%0A
Subtotal: ${formatPrice(orderData.subtotal)}%0A
Delivery Fee: ${formatPrice(orderData.deliveryFee)}%0A
Total: ${formatPrice(orderData.total)}%0A
Payment Method: ${orderData.customer.paymentMethod}%0A%0A
Special Instructions: ${orderData.customer.specialInstructions || "None"}`;

    window.open(`https://wa.me/254780667707?text=${message}`, "_blank");
  };

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen pt-28 px-6 bg-white flex items-center justify-center">
        <div className="text-center">
          <svg
            className="mx-auto h-24 w-24 text-gray-400 mb-6"
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
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Add some delicious items before checking out
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition font-semibold"
          >
            Continue Shopping 🛒
          </button>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen pt-28 px-6 bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-4">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll contact you shortly on WhatsApp.
          </p>
          <button
            onClick={() => navigate("/shop")}
            className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-green-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary - Sidebar on desktop */}
          <div className="lg:order-2">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-28">
              <h2 className="text-xl font-bold text-green-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 border-b pb-3">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <p className="text-orange-600 font-bold text-sm">
                        {formatPrice(item.price)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold">
                    {formatPrice(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="text-lg font-bold text-green-900">
                    Total
                  </span>
                  <span className="text-xl font-bold text-orange-600">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-bold text-green-900 mb-4">
                Delivery Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Street, building, house number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Date *
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    required
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Time *
                  </label>
                  <select
                    name="deliveryTime"
                    required
                    value={formData.deliveryTime}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">Select time</option>
                    <option value="9:00 AM - 12:00 PM">
                      9:00 AM - 12:00 PM
                    </option>
                    <option value="12:00 PM - 3:00 PM">
                      12:00 PM - 3:00 PM
                    </option>
                    <option value="3:00 PM - 6:00 PM">3:00 PM - 6:00 PM</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Method *
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="mpesa"
                        checked={formData.paymentMethod === "mpesa"}
                        onChange={handleInputChange}
                        className="text-orange-600"
                      />
                      <span className="font-medium">
                        M-Pesa (Pay on delivery)
                      </span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cash"
                        checked={formData.paymentMethod === "cash"}
                        onChange={handleInputChange}
                        className="text-orange-600"
                      />
                      <span className="font-medium">Cash on Delivery</span>
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions
                  </label>
                  <textarea
                    name="specialInstructions"
                    rows="3"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Any special requests or delivery notes..."
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/shop")}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Back to Cart
                </button>
                <button
                  onClick={() => {
                    navigate("/order-success");
                  }}
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition font-semibold disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Placing Order..."
                    : `Place Order - ${formatPrice(total)}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
