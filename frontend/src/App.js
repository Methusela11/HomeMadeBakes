import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5038/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const orderCake = (id) => {
    const name = prompt("Your name:");
    const phone = prompt("Phone:");
    const location = prompt("Location:");

    fetch("http://localhost:5038/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productId: id,
        customerName: name,
        phone,
        location,
        message: ""
      })
    }).then(() => alert("Order placed!"));
  };

  return (
    <div className="bg-pink-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-pink-600">
        RMEKS Bakery 🎂
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {products.map(p => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow">
            <img src={p.imageUrl} alt="" />
            <h2 className="text-xl font-bold">{p.name}</h2>
            <p>KES {p.price}</p>

            <button
              onClick={() => orderCake(p.id)}
              className="bg-pink-500 text-white px-4 py-2 rounded mt-2"
            >
              Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;