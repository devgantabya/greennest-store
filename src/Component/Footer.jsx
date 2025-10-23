import React from "react";
import FooterLogo from "../assets/logo.png";
import { FaInstagram, FaPinterestP } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t py-3 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 pb-3">
        <div>
          <img src={FooterLogo} alt="GreenNest" className="w-50 h-auto" />
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:link hover:text-green-600">
            About
          </a>
          <a href="#" className="hover:link hover:text-green-600">
            Contact
          </a>
          <a href="#" className="hover:link hover:text-green-600">
            Privacy Policy
          </a>
        </div>
        <div className="flex gap-3">
          <a className="btn btn-ghost btn-circle">
            <FaInstagram size={20} />
          </a>
          <a className="btn btn-ghost btn-circle">
            <FaFacebookF size={20} />
          </a>
          <a className="btn btn-ghost btn-circle">
            <FaPinterestP size={20} />
          </a>
        </div>
      </div>
      <div className="border-t border-gray-600 py-5">
        <div className="container mx-auto">
          <p className="text-center text-mute">
            © {new Date().getFullYear()} GreenNest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
