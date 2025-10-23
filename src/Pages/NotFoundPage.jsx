import React from "react";
import errorPageImg from "../assets/404.jpg";
import { Link } from "react-router";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";

const ErrorPage = () => {
  return (
    <div className="bg-white">
      <title>GreenNest - 404</title>
      <Navbar></Navbar>
      <div className="container mx-auto"></div>
      <div className="p-4 pb-12 md:pb-20 flex justify-center items-center">
        <div className="text-center">
          <img
            className="w-auto h-100 mx-auto"
            src={errorPageImg}
            alt="404 - Page Not Found"
          />
          <h1 className="text-[#001931] font-semibold text-5xl leading-15">
            Oops, page not found!
          </h1>
          <p className="text-[#627382] text-xl py-4 mb-4">
            The page you are looking for is not available.
          </p>
          <Link
            to="/"
            className="bg-green-500 py-2 px-4 text-white rounded text-base font-semibold"
          >
            <button>Go Back!</button>
          </Link>
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default ErrorPage;
