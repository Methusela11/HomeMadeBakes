import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect to shop after 5 seconds
    const timer = setTimeout(() => {
      navigate("/shop");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen pt-28 px-6 bg-white flex items-center justify-center">
      <div className="text-center max-w-md">
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

        <h1 className="text-3xl font-bold text-green-900 mb-4">
          Order Confirmed! 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for shopping with RMEKS Bakery. Your order has been received
          and is being processed.
        </p>

        <div className="bg-orange-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-gray-700">
            📱 You will receive a WhatsApp confirmation shortly with your order
            details.
          </p>
        </div>

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
