import { useEffect, useState } from "react";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://127.0.0.1:8000/api/products/";

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(API_URL);

        const text = await res.text();

        try {
          const data = JSON.parse(text);
          setProducts(Array.isArray(data) ? data : []);
        } catch {
          throw new Error("API did not return JSON (ngrok blocked)");
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="min-h-screen pt-28 px-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-green-900 mb-6">
        Explore Our Products
      </h1>

      {/* LOADING */}
      {loading && (
        <p className="text-green-900 font-semibold">Loading products...</p>
      )}

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && products.length === 0 && (
        <p className="text-gray-500">No products found.</p>
      )}

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="shadow-md rounded-xl p-4 bg-white hover:shadow-lg transition"
          >
            <img
              src={p.image || "https://via.placeholder.com/300"}
              alt={p.name}
              className="h-48 w-full object-cover rounded-lg"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300";
              }}
            />

            <h2 className="font-bold mt-2 text-green-900">{p.name}</h2>

            <p className="text-sm text-gray-600">
              {p.description || "No description"}
            </p>

            <p className="text-orange-600 font-bold mt-2">KES {p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
