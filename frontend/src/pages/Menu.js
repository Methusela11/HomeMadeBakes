import { Link } from "react-router-dom";
import getrudeImage from "../assets/images/chefs/chef1.png";
import getrude1Image from "../assets/images/chefs/chef2.png";
import getrude2Image from "../assets/images/chefs/chef1.png";

export default function About() {
  return (
    <div className="min-h-screen bg-white pt-38 font-sans">
      {/* HERO */}
      <section className="pt-32 text-center px-6">
        <div className="text-green-900">
          <h1 className="text-4xl font-bold">Services</h1>

          <h2 className="text-3xl md:text-3xl font-bold leading-tight max-w-3xl mx-auto pt-2">
            Our Services at RMEKS Bakery
          </h2>
        </div>

        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          RMEKS Bakery offers professional baking, cake customization, event catering,
          and reliable delivery services to make every occasion memorable.
        </p>
      </section>

      {/* TEAM / STORY */}
      <section className="grid md:grid-cols-3 gap-8 px-6 md:px-12 mt-16 pb-20">
        {/* CARD 1 */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition">
          <div className="bg-[#f3e8dc] h-64 flex items-center justify-center">
            <img
              alt="Getrude"
              src={getrudeImage}
              className="h-full object-contain"
            />
          </div>

          <div className="bg-orange-100 px-4 py-2 text-sm text-orange-600">
            01
          </div>

          <div className="p-6 text-center">
            <h3 className="font-semibold text-lg text-green-900">
              Baking
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Enjoy fresh bakery products delivered directly to your doorstep. We ensure
  timely and safe delivery for every order.
            </p>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition">
          <div className="bg-[#f3e8dc] h-64 flex items-center justify-center">
            <img
              alt="Getrude"
              src={getrude1Image}
              className="h-full object-contain"
            />
          </div>

          <div className="bg-orange-100 px-4 py-2 text-sm text-orange-600">
            02
          </div>

          <div className="p-6 text-center">
            <h3 className="font-semibold text-lg text-green-900">
              Home Delivery
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Enjoy fresh bakery products delivered directly to your doorstep. We ensure
  timely and safe delivery for every order.
            </p>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition">
          <div className="bg-[#f3e8dc] h-64 flex items-center justify-center">
            <img
              alt="Getrude"
              src={getrude2Image}
              className="h-full object-contain"
            />
          </div>

          <div className="bg-orange-100 px-4 py-2 text-sm text-orange-600">
            03
          </div>

          <div className="p-6 text-center">
            <h3 className="font-semibold text-lg text-green-900">
              Event Catering
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              We provide bakery supplies for weddings, corporate events, parties, and
  celebrations, ensuring delicious treats for all your guests.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-20 px-6">
        <h3 className="text-2xl font-bold text-green-900 mb-4">
          Let us bake something special for you.
        </h3>

        <Link
          to="/shop"
          className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition hover:text-green-900"
        >
          Explore Our Products
        </Link>
      </section>
    </div>
  );
}
