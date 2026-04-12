import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import cakeImage from "../assets/images/cakes/1.png";
import cupCakeImage from "../assets/images/cupcakes/1.png";
import cookiesImage from "../assets/images/cookies/11.png";
import breadImage from "../assets/images/bread/11.png";
import chocolatesImage from "../assets/images/chocolates/111.png";

export default function Shop() {
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.category || "All",
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://25d0-41-220-233-110.ngrok-free.app/api/products/";

  const categories = [
    { name: "All" },
    { name: "Cakes", image: cakeImage },
    { name: "Cupcakes", image: cupCakeImage },
    { name: "Cookies", image: cookiesImage },
    { name: "Bread", image: breadImage },
    { name: "Chocolate", image: chocolatesImage },
  ];

  // FETCH PRODUCTS
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        setProducts(data);
        setFiltered(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // FILTER LOGIC
  useEffect(() => {
    if (selectedCategory === "All") {
      setFiltered(products);
    } else {
      const filteredData = products.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
      setFiltered(filteredData);
    }
  }, [selectedCategory, products]);

  return (
    <div className="min-h-screen pt-28 px-6 bg-gray-50">
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-green-900 mb-6">
        Explore Our Products
      </h1>

      {/* CATEGORY SECTION */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => setSelectedCategory(cat.name)}
            className={`cursor-pointer rounded-xl p-3 text-center shadow-sm border transition 
              ${
                selectedCategory === cat.name
                  ? "bg-orange-500 text-white"
                  : "bg-white hover:shadow-md"
              }`}
          >
            {cat.image && (
              <img
                src={cat.image}
                alt={cat.name}
                className="w-16 h-16 mx-auto object-cover rounded-full mb-2"
              />
            )}
            <p className="font-semibold">{cat.name}</p>
          </div>
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-green-900 font-semibold">Loading products...</p>
      )}

      {/* ERROR */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && filtered.length === 0 && (
        <p className="text-gray-500 text-lg">
          No products in{" "}
          <span className="font-bold text-orange-500">{selectedCategory}</span>
        </p>
      )}

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={p.image || "https://via.placeholder.com/300"}
              alt={p.name}
              className="h-48 w-full object-cover"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/300")
              }
            />

            <div className="p-4">
              <h2 className="font-bold text-green-900">{p.name}</h2>

              <p className="text-sm text-gray-600 line-clamp-2">
                {p.description || "No description"}
              </p>

              <div className="flex justify-between items-center mt-3">
                <p className="text-orange-600 font-bold">KES {p.price}</p>

                <button className="bg-green-900 text-white px-3 py-1 rounded-lg text-sm hover:bg-orange-500 transition">
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
