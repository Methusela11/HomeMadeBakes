import { FaPlay } from "react-icons/fa";
import chocolateCake from "./assets/images/cakes/c11.png";
import cakeImage from "./assets/images/cakes/1.png";
import cookiesImage from "./assets/images/cookies/11.png";
import breadImage from "./assets/images/bread/11.png";
import getrudeImage from "./assets/images/chefs/getrude.png";
import Navbar from "./include/Navbar";

export default function BakeryLanding() {
  return (
    <div className="bg-[#f6f6f6] min-h-screen font-sans">
      <Navbar />

      <div className="flex flex-col md:flex-row items-center px-6 md:px-12 mt-10">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <button className="flex items-center gap-2 border border-gray-400 text-green-900 px-6 py-3 rounded-lg shadow">
              <div className="bg-red-500 text-white p-2 rounded-full flex items-center justify-center">
                <FaPlay size={10} />
              </div>
              <span>Watch Video</span>
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-green-900">
            We{" "}
            <span className="text-orange-500 underline decoration-4">Bake</span>
            <br />
            You Celebrate!
          </h1>

          <p className="text-gray-600 mt-6 max-w-md">
            <span className="font-semibold block mb-2">
              Tell Us Your Dream Cake, We'll Make It Happen.
            </span>
            We bake Anniversary cakes, Graduation cakes, Birthday cakes, Wedding
            cakes and Custom cakes.
          </p>

          <div className="flex gap-4 mt-6">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow">
              Read More
            </button>

            <button className="border border-gray-400 px-6 py-3 rounded-lg">
              Order Now
            </button>
          </div>
        </div>

        <div className="flex-1 relative mt-10 md:mt-0">
          <div className="bg-[#eee1d1] rounded-3xl p-6 w-fit mx-auto">
            <div className="flex gap-4 items-end">
              <img
                src={getrudeImage}
                alt="Chef portrait"
                className="w-[120px] rounded-2xl rotate-[-3deg] hover:scale-110 transition"
              />
              <img
                src={getrudeImage}
                alt="Chef portrait"
                className="w-[140px] rounded-2xl rotate-[2deg] hover:scale-110 transition"
              />
              <img
                src={getrudeImage}
                alt="Chef portrait"
                className="w-[120px] rounded-2xl rotate-[5deg] hover:scale-110 transition"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-12 mt-16 items-center">
        <div className="flex items-center gap-4">
          <img src={chocolateCake} alt="Chocolate cake" className="w-24" />
          <div>
            <h3 className="font-bold">Chocolate Cake</h3>
          </div>
        </div>

        {[cakeImage, cookiesImage, breadImage].map((img, i) => (
          <div key={i} className="text-center">
            <div className="bg-orange-100 p-4 rounded-full w-fit mx-auto">
              <img
                src={img}
                alt={i === 0 ? "Cake" : i === 1 ? "Cookies" : "Bread"}
                className="w-36 h-36 object-cover rounded-full transition-transform duration-300 hover:scale-125"
              />
            </div>

            <h4 className="font-semibold mt-2">
              {i === 0 ? "Cake" : i === 1 ? "Cookies" : "Bread"}
            </h4>

            <p className="text-sm text-gray-500">
              {i === 0
                ? "These cakes are made with butter"
                : i === 1
                  ? "These Cookies contain rich ingredients"
                  : "These Bread are freshly baked daily"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
