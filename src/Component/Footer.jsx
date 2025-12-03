import React from "react";
import FooterLogo from "../assets/logo.png";
import { FaInstagram, FaPinterestP } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 border-t border-gray-800 py-6  text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6 py-3">
        <div className="flex items-center">
          <img
            src={FooterLogo}
            alt="GreenNest"
            className="w-32 md:w-40 h-auto opacity-90 hover:opacity-100 transition"
          />
        </div>
        <div className="flex gap-6 text-gray-300 dark:text-gray-400">
          <Link
            to="/about"
            className="hover:text-green-500 transition font-medium"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-green-500 transition font-medium"
          >
            Contact Us
          </Link>
        </div>
        <div className="flex gap-4">
          <a
            href="https://www.instagram.com/dev_gantabya/"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-600 transition"
          >
            <FaInstagram size={18} />
          </a>
          <a
            href="https://www.facebook.com/devgantabya"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-600 transition"
          >
            <FaFacebookF size={18} />
          </a>
          <a
            href="https://www.pinterest.com/devgantabya/"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-green-600 transition"
          >
            <FaPinterestP size={18} />
          </a>
        </div>
      </div>
      <div className="border-t border-gray-700 dark:border-gray-800 py-4 mt-4">
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} GreenNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
