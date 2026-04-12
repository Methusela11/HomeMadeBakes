import { useEffect, useState } from "react";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://4516-41-220-233-110.ngrok-free.app/api/products/")
      .then(async (res) => {
        console.log("STATUS:", res.status);

        if (!res.ok) {
          throw new Error("HTTP Error " + res.status);
        }

        return res.json();
      })
      .then((data) => {
        console.log("DATA:", data);
        setProducts(data);
      })
      .catch((err) => {
        console.error("FETCH ERROR:", err.message);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen pt-28 px-6">
      <h1 className="text-3xl font-bold text-green-900 mb-6">
        Our Bakery Shop
      </h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <div key={p.id} className="shadow rounded-xl p-4 bg-white">
            <img
              src={p.image}
              alt={p.name}
              className="h-48 w-full object-cover rounded-lg"
            />
            <h2 className="font-bold mt-2">{p.name}</h2>
            <p>{p.description}</p>
            <p className="text-orange-600 font-bold">KES {p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
