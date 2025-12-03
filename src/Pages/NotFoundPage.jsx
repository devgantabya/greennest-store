import React, { useEffect, useState } from "react";
import errorPageImg from "../assets/404-not-found-plant.png";
import { Link } from "react-router";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

const ErrorPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center dark:bg-gray-900">
        <span className="loading loading-spinner loading-xl text-success"></span>
      </div>
    );

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors">
      <title>GreenNest - 404</title>
      <Navbar />

      <div className="container mx-auto"></div>

      <div className="py-10 md:py-16 flex justify-center items-center">
        <div className="text-center">
          <img
            className="w-auto h-20 md:h-50 mx-auto"
            src={errorPageImg}
            alt="404 - Page Not Found"
          />

          <h1 className="text-[#001931] dark:text-white font-semibold text-5xl leading-15 mt-4">
            Oops, page not found!
          </h1>

          <p className="text-[#627382] dark:text-gray-300 text-xl py-4 mb-4">
            The page you are looking for is not available.
          </p>

          <Link
            to="/"
            className="inline-block bg-green-500 hover:bg-green-600 py-2 px-4 text-white rounded text-base font-semibold transition"
          >
            Go Back!
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ErrorPage;
