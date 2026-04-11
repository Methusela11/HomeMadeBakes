import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import cakeImage from "../assets/images/cakes/1.png";
import cupCakeImage from "../assets/images/cupcakes/1.png";
import cookiesImage from "../assets/images/cookies/11.png";
import breadImage from "../assets/images/bread/11.png";
import chocolatesImage from "../assets/images/chocolates/111.png";

import getrudeImage from "../assets/images/chefs/chef1.png";
import getrude1Image from "../assets/images/chefs/chef2.png";
import getrude2Image from "../assets/images/chefs/chef1.png";

export default function BakeryLanding() {
  const [showVideo, setShowVideo] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    {
      name: "Cakes",
      image: cakeImage,
      desc: "Delicious cakes for every occasion",
    },
    {
      name: "Cupcakes",
      image: cupCakeImage,
      desc: "Delicious Cupcakes for every occasion",
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
    if (products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [products]);

  useEffect(() => {
    const container = document.querySelector(".snap-x");

    const handleScroll = () => {
      const slides = document.querySelectorAll("[data-index]");

      slides.forEach((_, index) => {
        const element = slides[index];
        if (!element) return;

        const rect = element.getBoundingClientRect();

        if (rect.left >= -100 && rect.left <= 100) {
          setCurrentIndex(index);
        }
      });
    };

    container?.addEventListener("scroll", handleScroll);

    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch(
          "https://b422-41-220-233-110.ngrok-free.app/api/products/",
        );

        const data = await res.json();

        const productsArray = Array.isArray(data) ? data : data?.results || [];

        setProducts(productsArray);
      } catch (err) {
        console.log("FETCH ERROR:", err);

        // ✅ fallback demo data
        setProducts([
          {
            id: 1,
            name: "Chocolate Cake",
            price: 1500,
            image: "/placeholder.png",
          },
          {
            id: 2,
            name: "Vanilla Cookies",
            price: 300,
            image: "/placeholder.png",
          },
        ]);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="min-h-screen font-sans pt-24 pb-32">
      {/* HERO */}
      <div className="flex flex-col md:flex-row items-center gap-10 px-4 sm:px-6 md:px-12 mt-10">
        {/* LEFT */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 pt-0">
            We <span className="text-orange-500">Bake,</span> You Celebrate!
          </h1>

          <div className="flex justify-center md:justify-start pt-1">
            <button className="flex items-center gap-2 border border-gray-400 text-green-900 px-6 py-3 rounded-lg shadow mb-4 hover:scale-105 transition hover:font-bold">
              <div className="bg-red-500 text-white p-2 rounded-full">
                <FaPlay size={10} />
              </div>
              Watch Video
            </button>
          </div>

          <p className="text-gray-800 mt-0 max-w-md pt-0">
            <span className="font-semibold block mb-2">
              All in one store for cakes, breads, cookies and chocolates.
            </span>
            Tell Us Your Dream Cake, We'll Make It Happen.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
            <Link
              to="/contact"
              className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:text-gray-800 hover:scale-105 transition"
            >
              Get in Touch?
            </Link>

            <Link
              to="/order"
              className="border border-gray-400 px-6 py-3 rounded-lg hover:font-bold hover:text-orange-500 hover:scale-105 transition"
            >
              Order Now
            </Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 mt-10 md:mt-0">
          <div className="bg-[#eee1d1] rounded-3xl p-4 flex flex-wrap justify-center gap-3 max-w-[320px] md:max-w-none mx-auto">
            <img
              alt="chef"
              src={getrudeImage}
              className="w-[90px] sm:w-[110px] rounded-2xl rotate-[-3deg] hover:scale-125 transition"
            />
            <img
              alt="chef"
              src={getrude1Image}
              className="w-[90px] sm:w-[110px] rounded-2xl rotate-[2deg] hover:scale-125 transition"
            />
            <img
              alt="chef"
              src={getrude2Image}
              className="w-[90px] sm:w-[110px] rounded-2xl rotate-[5deg] hover:scale-125 transition"
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
          <>
            {/* SLIDER */}
            <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {products.map((product, index) => {
                  const imageUrl = product.image
                    ? product.image.startsWith("http")
                      ? product.image
                      : `https://b422-41-220-233-110.ngrok-free.app${product.image}`
                    : "/placeholder.png";

                  return (
                    <div
                      key={product.id}
                      className="min-w-full flex justify-center snap-center"
                      onClick={() => setCurrentIndex(index)} // optional sync
                    >
                      <div className="bg-orange-50 rounded-lg p-4 text-center w-[250px] sm:w-[300px] hover:shadow-lg transition">
                        <img
                          src={imageUrl}
                          alt={product.name}
                          className="w-32 h-32 sm:w-40 sm:h-40 object-contain mx-auto"
                        />

                        <h3 className="font-semibold mt-3 text-green-900">
                          {product.name}
                        </h3>

                        <p className="text-blue-700 text-sm">
                          From {product.price} KES
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DOTS */}
            <div className="flex justify-center mt-6 gap-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition ${
                    currentIndex === index ? "bg-orange-500 w-4" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="px-6 md:px-12 mt-20">
        <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-10">
          Our Products Categories
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((item, i) => (
            <Link
              to="/shop"
              state={{ category: item.name }}
              key={i}
              className="group cursor-pointer"
            >
              <div className="bg-orange-50 rounded-2xl p-4 sm:p-6 text-center shadow-md transition duration-300 border border-gray-100 hover:border-green-900">
                <div className="bg-orange-100 p-4 rounded-full w-fit mx-auto mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h4 className="font-semibold mt-2 group-hover:text-orange-500 transition">
                  {item.name}
                </h4>

                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* VIDEO MODAL */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[95%] max-w-3xl p-3 sm:p-4 relative">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute right-1 top-0 text-xl"
            >
              ✕
            </button>

            <iframe
              className="w-full h-[220px] sm:h-[400px] rounded-lg"
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
