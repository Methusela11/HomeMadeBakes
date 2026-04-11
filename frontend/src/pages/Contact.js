import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "soenkilifi@gmail.com",
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });

        setTimeout(() => setSuccess(false), 4000);
      })
      .catch((err) => {
        console.log(err);
        setError(true);

        setTimeout(() => setError(false), 4000);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen font-sans pt-28 px-6 md:px-12 bg-orange-50">
      <h1 className="text-3xl font-bold text-green-900 mb-10 text-center">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* FORM */}
        <form
          onSubmit={sendEmail}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 border rounded-lg"
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full p-3 mb-4 border rounded-lg"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-900 text-white px-6 py-3 rounded-lg w-full hover:bg-green-800 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p className="text-green-600 mt-3 font-semibold">
              Message sent successfully ✅
            </p>
          )}

          {error && (
            <p className="text-red-600 mt-3 font-semibold">
              Failed to send message ❌
            </p>
          )}
        </form>

        {/* CONTACT INFO */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-green-900">
            Get in Touch
          </h2>

          <p className="mb-4 text-gray-600">
            We are always ready to help you with your orders and inquiries.
          </p>

          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Location:</strong> Kilifi, Kenya
            </p>

            <p>
              📞 <strong>Phone:</strong> +254 110 440 006
            </p>

            <p>
              📞 <strong>Alt Phone:</strong> +254 746 688 304
            </p>

            <p>
              <strong>Email:</strong> soenkilifi@gmail.com
            </p>

            <p>
              🕒 <strong>Working Hours:</strong> 8:00 AM – 8:00 PM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
