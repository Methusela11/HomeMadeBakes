import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import cakeImage from "../assets/images/cakes/1.png";
import cookiesImage from "../assets/images/cookies/11.png";
import breadImage from "../assets/images/bread/11.png";
import chocolatesImage from "../assets/images/chocolates/111.png";

import getrudeImage from "../assets/images/chefs/chef1.png";
import getrude1Image from "../assets/images/chefs/chef2.png";
import getrude2Image from "../assets/images/chefs/chef1.png";

export default function BakeryLanding() {
  const [showVideo, setShowVideo] = useState(false);
  const [products, setProducts] = useState([]);

  const categories = [
    {
      name: "Cakes",
      image: cakeImage,
      desc: "Delicious cakes for every occasion",
    },
    {
      name: "Cookies",
      image: cookiesImage,
      desc: "Crunchy cookies with rich ingredients",
    },
    { name: "Bread", image: breadImage, desc: "Freshly baked bread every day" },
    {
      name: "Chocolates",
      image: chocolatesImage,
      desc: "Sweet handcrafted chocolate treats",
    },
  ];

  useEffect(() => {
    fetch("https://b422-41-220-233-110.ngrok-free.app/api/products/")
      .then((res) => res.json())
      .then((data) => {
        console.log("RAW DATA:", data);

        // ✅ handle both array and paginated response
        const productsArray = Array.isArray(data) ? data : data.results;

        setProducts(productsArray || []);
      })
      .catch((err) => {
        console.log("FETCH ERROR:", err);
        setProducts([]);
      });
  }, []);

  return (
    <div className="min-h-screen font-sans pt-28 pb-32">
      {/* HERO */}
      <div className="flex flex-col md:flex-row items-center px-6 md:px-12 mt-10">
        {/* LEFT */}
        <div className="flex-1">
          <button
            onClick={() => setShowVideo(true)}
            className="flex items-center gap-2 border border-gray-400 text-green-900 px-6 py-3 rounded-lg shadow mb-4"
          >
            <div className="bg-red-500 text-white p-2 rounded-full">
              <FaPlay size={10} />
            </div>
            Watch Video
          </button>

          <h1 className="text-4xl md:text-5xl font-bold text-green-900">
            We <span className="text-orange-500">Bake,</span> You Celebrate!
          </h1>

          <p className="text-gray-800 mt-6 max-w-md">
            <span className="font-semibold block mb-2">
              All in one store for cakes, breads, cookies and chocolates.
            </span>
            Tell Us Your Dream Cake, We'll Make It Happen.
          </p>

          <div className="flex gap-4 mt-6">
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold"
            >
              Get in Touch?
            </Link>

            <Link
              to="/order"
              className="border border-gray-400 px-6 py-3 rounded-lg"
            >
              Order Now
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 mt-10 md:mt-0">
          <div className="bg-[#eee1d1] rounded-3xl p-6 w-fit mx-auto flex gap-4 items-end">
            <img
              alt="chef"
              src={getrudeImage}
              className="w-[120px] rounded-2xl rotate-[-3deg]"
            />
            <img
              alt="chef"
              src={getrude1Image}
              className="w-[140px] rounded-2xl rotate-[2deg]"
            />
            <img
              alt="chef"
              src={getrude2Image}
              className="w-[120px] rounded-2xl rotate-[5deg]"
            />
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 mt-20">
        <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-10">
          Latest Products
        </h1>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => {
              const imageUrl = product.image?.startsWith("http")
                ? product.image
                : `https://b422-41-220-233-110.ngrok-free.app${product.image}`;

              return (
                <div
                  key={product.id}
                  className="bg-gray-200 rounded-lg p-4 text-center hover:shadow-lg transition"
                >
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-40 h-40 object-contain mx-auto"
                  />

                  <h3 className="font-semibold mt-3 text-green-900">
                    {product.name}
                  </h3>

                  <p className="text-blue-700 text-sm">
                    From {product.price} KES
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CATEGORIES */}
      <div className="px-6 md:px-12 mt-16">
        <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-10">
          Our Product Categories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((item, i) => (
            <div key={i} className="text-center">
              <div className="bg-orange-100 p-4 rounded-full w-fit mx-auto">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-36 h-36 object-cover rounded-full hover:scale-110 transition"
                />
              </div>
              <h4 className="font-semibold mt-2">{item.name}</h4>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* VIDEO MODAL */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[90%] max-w-3xl p-4 relative">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute right-2 top-2 text-xl"
            >
              ✕
            </button>

            <iframe
              className="w-full h-[400px] rounded-lg"
              src="https://www.youtube.com/embed/EYXQmbZNhy8"
              title="Bakery video"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
