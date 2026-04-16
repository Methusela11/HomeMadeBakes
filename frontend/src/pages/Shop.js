import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import cakeImage from "../assets/images/cakes/1.png";
import cupCakeImage from "../assets/images/cupcakes/1.png";
import cookiesImage from "../assets/images/cookies/11.png";
import breadImage from "../assets/images/bread/11.png";
import chocolatesImage from "../assets/images/chocolates/111.png";
import specialImage from "../assets/images/special/11.png";

const API_URL = "https://rmeks-bakery-backend.onrender.com/api/products/";

export default function Shop() {
  const location = useLocation();

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.category || null,
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { name: "cakes", image: cakeImage, label: "Cakes" },
    { name: "cupcakes", image: cupCakeImage, label: "Cupcakes" },
    { name: "cookies", image: cookiesImage, label: "Cookies" },
    { name: "bread", image: breadImage, label: "Bread" },
    { name: "chocolate", image: chocolatesImage, label: "Chocolates" },
    { name: "special", image: specialImage, label: "Special Products" },
  ];

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

  useEffect(() => {
    if (!selectedCategory) {
      setFiltered(products);
    } else {
      const filteredData = products.filter(
        (p) => p.category === selectedCategory,
      );
      setFiltered(filteredData);
    }
  }, [selectedCategory, products]);

  return (
    <div className="min-h-screen pt-28 px-6 bg-white">
      {/* <h1 className="text-3xl font-bold text-green-900 mb-6">Shop</h1> */}
      <h1 className="text-2xl font-bold text-green-900 mb-6">
        {selectedCategory
          ? `Showing ${
              categories.find((c) => c.name === selectedCategory)?.label
            }`
          : "Explore Our Products"}{" "}
        in Shop
      </h1>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => setSelectedCategory(cat.name)}
            className={`cursor-pointer rounded-xl p-0 text-center shadow-sm border transition border-gray-300 hover:border-green-900 ${selectedCategory === cat.name ? "bg-orange-200 text-white" : "bg-white hover:shadow-md"}`}
          >
            {cat.image && (
              <img
                src={cat.image}
                alt={cat.name}
                className="w-14 h-14 mx-auto object-cover rounded-full mb-1"
              />
            )}
            <p className="text-xs sm:text-sm font-semibold text-green-900">
              {cat.label}
            </p>
          </div>
        ))}
      </div>
      {selectedCategory && (
        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
          <button
            onClick={() => setSelectedCategory(null)}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:scale-110 transition hover:text-green-900"
          >
            Show All Products
          </button>
        </div>
      )}

      <h1 className="text-2xl font-bold text-green-900 mb-6 pt-4">
        {selectedCategory
          ? `Explore ${
              categories.find((c) => c.name === selectedCategory)?.label
            } Category`
          : "Explore All Our Products"}
      </h1>

      {loading && (
        <p className="text-green-900 font-semibold">Loading products...</p>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      {!loading && !error && filtered.length === 0 && selectedCategory && (
        <p className="text-gray-500 text-lg">
          ❌ No products in{" "}
          <span className="font-bold text-green-900">
            {categories.find((c) => c.name === selectedCategory)?.label}{" "}
            Category
          </span>
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col hover:scale-110"
          >
            <img
              src={p.image || "https://via.placeholder.com/300"}
              alt={p.name}
              className="h-28 sm:h-32 md:h-40 w-full object-cover"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/300")
              }
            />

            <div className="p-2 sm:p-3 md:p-4">
              <h2 className="font-semibold text-sm sm:text-base text-green-900 line-clamp-1">
                {p.name}
              </h2>

              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                {p.description || "No description"}
              </p>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-2">
                {" "}
                <div className="flex flex-col">
                  {p.initial_price &&
                    Number(p.initial_price) > Number(p.price) && (
                      <span className="text-green-900 line-through text-sm">
                        Was KES {p.initial_price}
                      </span>
                    )}

                  <span className="text-orange-600 font-bold text-sm sm:text-base">
                    {p.initial_price ? "Now " : ""}KES {p.price}
                  </span>
                </div>
                <button className="bg-green-900 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md text-xs sm:text-sm hover:bg-orange-500 transition">
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
