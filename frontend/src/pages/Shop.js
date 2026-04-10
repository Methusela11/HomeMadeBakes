import { useEffect, useState } from "react";

export default function Shop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log("Error fetching products:", err));
  }, []);

  return (
    <div className="min-h-screen font-sans pt-24 px-6">
      <h1 className="text-3xl font-bold mb-6">Shop Page</h1>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            {/* IMAGE */}
            <img
              src={`http://127.0.0.1:8000${product.image}`}
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
    </div>
  );
}
