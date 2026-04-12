import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

import cakeImage from "../assets/images/cakes/1.png";
import cupCakeImage from "../assets/images/cupcakes/1.png";
import cookiesImage from "../assets/images/cookies/11.png";
import breadImage from "../assets/images/bread/11.png";
import chocolatesImage from "../assets/images/chocolates/111.png";

import chef3Image from "../assets/images/chefs/chef3.png";
import chef2Image from "../assets/images/chefs/chef2.png";
import chef1Image from "../assets/images/chefs/chef1.png";

export default function BakeryLanding() {
  const [showVideo, setShowVideo] = useState(false);

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

  return (
    <div className="min-h-screen font-sans pt-24">
      {/* HERO */}
      <div className="flex flex-col md:flex-row items-center gap-10 px-4 sm:px-6 md:px-12 mt-10">
        {/* LEFT */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 pt-0">
            We <span className="text-orange-500">Bake,</span> You Celebrate!
          </h1>

          <div className="flex justify-center md:justify-start pt-1 mt-0 pb-2">
            <button
              onClick={() => setShowVideo(true)}
              className="flex items-center gap-3 border border-gray-300 text-green-900 px-6 py-3 rounded-lg shadow-sm bg-white hover:font-bold hover:scale-105 transition duration-300 group"
            >
              <div className="bg-red-500 text-white p-2 rounded-full group-hover:scale-110 transition">
                <FaPlay size={10} />
              </div>
              <span className="font-medium group-hover:text-orange-500 transition">
                Watch Video
              </span>
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
        <div className="flex-1 mt-3 md:mt-0 flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-green-900 mb-2">
            Our Chefs
          </h1>
          <div
            className="
    bg-[#eee1d1]
    rounded-3xl

    px-1 sm:px-4 md:px-6
    py-2

    flex
    justify-center
    items-end

    gap-2
    sm:gap-6
    md:gap-8

    w-[98vw]
    sm:w-full

    max-w-[1200px]
    mx-auto

    min-h-[200px]
    sm:min-h-[280px]
    lg:min-h-[340px]

    overflow-hidden
  "
          >
            {" "}
            <img
              alt="chef"
              src={chef3Image}
              className=" w-[70px] sm:w-[130px] md:w-[150px] lg:w-[180px] object-contain rounded-2xl rotate-[-4deg] transition duration-300 hover:scale-125
  "
            />
            <img
              alt="chef"
              src={chef2Image}
              className="w-[100px] sm:w-[150px] md:w-[170px] lg:w-[200px] object-contain rounded-2xl scale-105 transition duration-300 hover:scale-110
  "
            />
            <img
              alt="chef"
              src={chef1Image}
              className=" w-[70px] sm:w-[130px] md:w-[150px] lg:w-[180px] object-contain rounded-2xl rotate-[4deg] transition duration-300 hover:scale-125 "
            />
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 mt-10">
        <h1 className="text-2xl md:text-3xl font-bold text-green-900 mb-2">
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
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          //   onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 bg-white text-black px-4 py-1 rounded-full shadow-md hover:bg-orange-500 hover:text-white transition font-bold"
            >
              ✕ Close
            </button>
            <div className="bg-orange-300 p-1 sm:p-1 rounded-2xl shadow-2xl">
              {/* VIDEO CONTAINER (16:9 aspect ratio) */}
              <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/EYXQmbZNhy8?autoplay=1"
                  title="Bakery video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
