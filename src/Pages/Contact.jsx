import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading)
    return (
      <div className="text-center mt-20 h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-xl text-success"></span>
      </div>
    );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <section className="px-4 container mx-auto py-12 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We're here to help! Whether you have questions about plants, need
            care advice, or want to get in touch with our support team — feel
            free to reach out anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-green-50 dark:bg-gray-800 p-8 rounded-xl shadow hover:shadow-xl transition text-center">
            <FaPhoneAlt className="text-4xl text-[#209d50] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Phone
            </h3>
            <p className="text-gray-600 dark:text-gray-300">+880 1956 968421</p>
          </div>

          <div className="bg-green-50 dark:bg-gray-800 p-8 rounded-xl shadow hover:shadow-xl transition text-center">
            <FaEnvelope className="text-4xl text-[#209d50] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Email
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              developergantabya@gmail.com
            </p>
          </div>

          <div className="bg-green-50 dark:bg-gray-800 p-8 rounded-xl shadow hover:shadow-xl transition text-center">
            <FaMapMarkerAlt className="text-4xl text-[#209d50] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Location
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Khulna, Bangladesh
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 md:p-12 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Send Us a Message
          </h2>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209d50]"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209d50]"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209d50]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#209d50] hover:bg-[#12863f] text-white font-semibold py-3 rounded-lg transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
