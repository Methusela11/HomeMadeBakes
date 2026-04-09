import { FaPlay, FaUser } from "react-icons/fa";

export default function BakeryLanding() {
  return (
    <div className="bg-[#f6f6f6] min-h-screen font-sans">

      <nav className="flex justify-between items-center px-12 py-6">
        <h1 className="text-2xl font-bold">
          <span className="text-orange-500">RMEKS </span>Bakery
        </h1>

        <ul className="hidden md:flex gap-8 text-gray-700">
          <li>Home</li>
          <li>About</li>
          <li>Menu</li>
          <li>Reservation</li>
          <li>Order</li>
          <li>Contact</li>
        </ul>

        <div className="flex items-center gap-2 text-sm">
          <FaUser />
          <span>My Account</span>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row items-center px-12 mt-10">

        {/* LEFT */}
        <div className="flex-1">
          
          {/* Watch video */}
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <div className="bg-orange-500 text-white p-2 rounded-full">
              <FaPlay size={10} />
            </div>
            <span>Watch Video</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold leading-tight text-green-900">
            The Ideal{" "}
            <span className="text-orange-500 underline decoration-4">
              Prepared
            </span>
            <br />
            Cake Regular!
          </h1>

          {/* Description */}
          <p className="text-gray-600 mt-6 max-w-md">
            These cakes are made with butter or another fat, like vegetable
            shortening. The common way is to mix the fat and sugar, then add
            eggs, and then add flour.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow">
              Read More
            </button>

            <button className="border border-gray-400 px-6 py-3 rounded-lg">
              Order Now
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 relative mt-10 md:mt-0">
          <div className="bg-[#e9d7c3] rounded-3xl p-6 w-fit mx-auto">
            <img
              src="https://images.unsplash.com/photo-1565958011703-44f9829ba187"
              alt="cake"
              className="w-[350px] rounded-2xl"
            />
          </div>

          {/* Floating decorations */}
          <img
            src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c"
            className="w-12 absolute top-0 right-10 rotate-12"
            alt=""
          />
        </div>
      </div>

      {/* 🍪 CATEGORY SECTION */}
      <div className="grid md:grid-cols-4 gap-6 px-12 mt-16 items-center">

        {/* Cupcake */}
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1586985289906-406988974504"
            className="w-24"
            alt=""
          />
          <div>
            <h3 className="text-xl font-bold">Chocolate Cake</h3>
            <div className="w-16 h-[2px] bg-orange-500 mt-1"></div>
          </div>
        </div>

        {/* Cake */}
        <div className="text-center">
          <div className="bg-orange-100 p-4 rounded-full w-fit mx-auto">
            🍰
          </div>
          <h4 className="font-semibold mt-2">Cake</h4>
          <p className="text-sm text-gray-500">
            These cakes are made with butter
          </p>
        </div>

        {/* Cookies */}
        <div className="text-center">
          <div className="bg-orange-100 p-4 rounded-full w-fit mx-auto">
            🍪
          </div>
          <h4 className="font-semibold mt-2">Cookies</h4>
          <p className="text-sm text-gray-500">
            These Cookies another fat, like vegetable
          </p>
        </div>

        {/* Bread */}
        <div className="text-center">
          <div className="bg-orange-100 p-4 rounded-full w-fit mx-auto">
            🍞
          </div>
          <h4 className="font-semibold mt-2">Bread</h4>
          <p className="text-sm text-gray-500">
            These Bread add eggs, and then add flour
          </p>
        </div>
      </div>
    </div>
  );
}