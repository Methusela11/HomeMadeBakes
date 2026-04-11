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
    <div className="min-h-[80vh] font-sans pt-32 px-6 md:px-10 bg-white">
      <h1 className="text-3xl font-bold text-green-900 mb-10 text-center">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* FORM */}
        <form
          onSubmit={sendEmail}
          className="bg-orange-50 p-6 rounded-xl shadow-md"
        >
          <h2 className="text-xl font-bold mb-4 text-green-900">
            Fill in the Form.
          </h2>
          <p className="mb-4 text-gray-600">
            Have a question or need assistance? Reach out by email, phone, or
            the form below we’re here to help you every step of the way.
          </p>
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

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="text-green-900 border border-gray-400 px-6 py-3 rounded-lg hover:font-bold hover:scale-105 transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>

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
        <div className="bg-orange-50 p-6 rounded-xl shadow-md">
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
