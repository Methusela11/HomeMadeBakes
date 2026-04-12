import { useEffect, useState } from "react";
import axios from "axios";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    "https://0d2e-41-220-233-110.ngrok-free.app/api/products/?format=json";

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const res = await axios.get(API_URL);

        if (isMounted) {
          // support both DRF formats
          const data = res.data.results ? res.data.results : res.data;

          setProducts(Array.isArray(data) ? data : []);
          setError(null);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError("Failed to load products. Please try again.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen font-sans pt-28 px-6 md:px-12 bg-white">
      {/* HEADER */}
      <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-2">
        Our Bakery Shop
      </h1>
      <p className="text-gray-600 mb-8">
        Fresh baked goodies made with love 🍰
      </p>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-green-900 font-semibold py-10">
          Loading products...
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="text-center text-red-600 font-semibold py-10">
          {error}
        </div>
      )}

      {/* PRODUCTS */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id || index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden group"
            >
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={
                    product.image
                      ? product.image
                      : "https://via.placeholder.com/300"
                  }
                  alt={product.name || "Product"}
                  className="w-full h-52 object-cover group-hover:scale-105 transition"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h2 className="text-lg font-bold text-green-900 group-hover:text-orange-500 transition">
                  {product.name}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {product.description || "No description available"}
                </p>

                {/* PRICE */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-orange-600 font-bold text-lg">
                    KES {product.price}
                  </span>

                  <button className="bg-green-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-orange-500 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && products.length === 0 && (
        <div className="text-center text-gray-500 py-10">
          No products available yet.
        </div>
      )}
    </div>
  );
}
