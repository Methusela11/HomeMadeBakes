import { useEffect, useState } from "react";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://8d54-41-220-233-110.ngrok-free.app/api/products/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="pt-24 text-center text-xl">Loading products...</div>;
  }

  return (
    <div className="min-h-screen font-sans pt-32 px-6">
      <h1 className="text-3xl font-bold mb-6">Shop Page</h1>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              {/* IMAGE */}
              <img
                src={`https://8d54-41-220-233-110.ngrok-free.app${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />

              {/* DETAILS */}
              <h2 className="text-xl font-semibold mt-2">{product.name}</h2>

              <p className="text-gray-500">{product.category}</p>

              <p className="text-sm mt-1">{product.description}</p>

              <p className="font-bold mt-2 text-orange-600">
                KES {product.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
