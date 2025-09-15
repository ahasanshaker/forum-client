import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* About */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            MyWebsite
          </h2>
          <p className="text-sm text-gray-600">
            Share your knowledge and connect with others on MyWebsite.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:text-indigo-600 transition-colors">Home</a>
            </li>
            <li>
              <a href="/join-us" className="hover:text-indigo-600 transition-colors">Join Us</a>
            </li>
            <li>
              <a href="/membership" className="hover:text-indigo-600 transition-colors">Membership</a>
            </li>
            <li>
              <a href="/notifications" className="hover:text-indigo-600 transition-colors">Notifications</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-4 mt-2">
            <a href="#" className="text-gray-700 hover:text-blue-500 transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-400 transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-700 hover:text-pink-500 transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-700 transition-colors">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center py-4 text-sm text-gray-500">
        © 2025 MyWebsite. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
