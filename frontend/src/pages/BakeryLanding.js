import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

import cakeImage from "../assets/images/cakes/1.png";
import cookiesImage from "../assets/images/cookies/11.png";
import breadImage from "../assets/images/bread/11.png";
import chocolatesImage from "../assets/images/chocolates/111.png";
import getrudeImage from "../assets/images/chefs/getrude.png";
import getrude1Image from "../assets/images/chefs/getrude1.png";
import getrude2Image from "../assets/images/chefs/getrude2.png";

export default function BakeryLanding() {
  const [showVideo, setShowVideo] = useState(false);

  const categories = [
    {
      name: "Cakes",
      image: cakeImage,
      desc: "Delicious cakes made for every occasion",
    },
    {
      name: "Cookies",
      image: cookiesImage,
      desc: "Crunchy cookies with rich ingredients",
    },
    {
      name: "Bread",
      image: breadImage,
      desc: "Freshly baked bread every day",
    },
    {
      name: "Chocolates",
      image: chocolatesImage,
      desc: "Sweet handcrafted chocolate treats",
    },
  ];

  return (
    <div className="min-h-screen font-sans pt-28">
      {/* HERO SECTION */}
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
            We <span className="text-orange-500">Bake,</span>
            <br />
            You Celebrate!
          </h1>

          <p className="text-gray-800 mt-6 max-w-md">
            <span className="font-semibold block mb-2">
              All in one store for cakes, breads, cookies and chocolates.
            </span>
            <span className="font-semibold block mb-2">
              Tell Us Your Dream Cake, We'll Make It Happen.
            </span>
            We bake Anniversary, Graduation, Birthday, Wedding and Custom cakes.
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
              className="border border-gray-400 px-6 py-3 rounded-lg hover:text-orange-500"
            >
              Order Now
            </Link>
          </div>
        </div>

        {/* RIGHT (CHEFS) */}
        <div className="flex-1 mt-10 md:mt-0">
          <div className="bg-[#eee1d1] rounded-3xl p-6 w-fit mx-auto">
            <div className="flex gap-4 items-end">
              <img
                src={getrudeImage}
                alt="Chef1"
                className="w-[120px] rounded-2xl rotate-[-3deg]"
              />
              <img
                src={getrude1Image}
                alt="Chef2"
                className="w-[140px] rounded-2xl rotate-[2deg]"
              />
              <img
                alt="Chef3"
                src={getrude2Image}
                className="w-[120px] rounded-2xl rotate-[5deg]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center px-6 md:px-12 mt-10">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900">
            Our <span className="text-orange-500">Products</span>
          </h1>
        </div>
      </div>

      {/* 🍰 CATEGORY SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-12 mt-16">
        {categories.map((item, i) => (
          <div key={i} className="text-center">
            <div className="bg-orange-100 p-4 rounded-full w-fit mx-auto">
              <img
                src={item.image}
                alt={item.name}
                className="w-36 h-36 object-cover rounded-full hover:scale-125 transition"
              />
            </div>

            <h4 className="font-semibold mt-2">{item.name}</h4>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* 🎥 VIDEO MODAL */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[90%] max-w-3xl p-4 relative">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute right-0.5 top-0 text-xl"
            >
              ✕
            </button>

            <iframe
              className="w-full h-[400px] rounded-lg"
              src="https://www.youtube.com/embed/EYXQmbZNhy8"
              title="Bakery promotional video" // ✅ FIX
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
