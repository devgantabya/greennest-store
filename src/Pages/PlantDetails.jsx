import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { toast } from "react-toastify";
import errorPlant from "../assets/404 plant.jpg";
import { FaStar } from "react-icons/fa";

const PlantDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    if (!user) {
      navigate(`/login?redirect=/plants/${id}`);
    }
  }, [user, navigate, id]);

  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          const matchingData = data.find((p) => p.plantId === parseInt(id));
          setPlant(matchingData);
          setLoading(false);
        }, 500);
      });
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Consultation booked successfully!");
    setForm({ name: "", email: "" });
  };

  if (loading)
    return (
      <div className="text-center mt-20 h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-xl text-success"></span>
      </div>
    );

  if (!plant)
    return (
      <div className="flex justify-center items-center h-screen">
        <title>GreenNest - Plant Not Found</title>
        <div className="text-center">
          <img className="w-80 mx-auto mb-6" src={errorPlant} alt="" />
          <h1 className="text-[#001931] font-semibold text-4xl mb-4">
            Oops! Plant not found.
          </h1>
          <Link
            to="/plants"
            className="inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-semibold transition"
          >
            Go Back
          </Link>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto my-10 md:my-12 px-4 md:px-0">
      <title>{`GreenNest - ${plant.plantName}`}</title>

      <section className="flex flex-col md:flex-row gap-8 md:gap-10 bg-white md:pt-8 pb-8">
        <div className="w-full md:w-1/2 relative bg-gray-100 rounded-xl">
          <img
            src={plant.image}
            alt={plant.plantName}
            className="w-full h-auto rounded-xl object-cover  p-4"
          />
          <div className="absolute top-4 left-4 bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
            {plant.category}
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {plant.plantName}
            </h1>
            <p className="text-gray-500 italic text-sm mb-4">
              by {plant.providerName}
            </p>

            <p className="text-3xl font-bold text-[#209d50] mb-4">
              ${plant.price}
            </p>

            <div className="flex items-center gap-6 text-gray-700 mb-4">
              <p>
                <span className="font-semibold">Care Level:</span>{" "}
                {plant.careLevel}
              </p>
              <p className="flex items-center gap-1 font-semibold text-yellow-500">
                <FaStar /> {plant.rating}
              </p>
            </div>

            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Available Stock:</span>{" "}
              {plant.availableStock}
            </p>

            <p className="text-gray-600 leading-relaxed mb-5">
              {plant.description}
            </p>
          </div>

          <div className="border-t border-gray-300 pt-6">
            <h3 className="text-2xl font-semibold mb-5 text-gray-800">
              Book a Consultation
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  id="name"
                  placeholder="Your Name"
                  className="w-full border border-gray-300 rounded-lg  px-4 py-3  text-gray-900 placeholder-gray-400  focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  id="email"
                  placeholder="Your Email"
                  className="w-full border border-gray-300 rounded-lg  px-4 py-3  text-gray-900 placeholder-gray-400  focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#209d50] hover:bg-[#127538] text-white text-lg py-3 rounded-lg transition font-bold"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-400">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 md:mt-10 tracking-tight">
          Decor Idea
        </h1>
        <img
          src={plant.decorImage}
          alt={plant.plantName}
          className="w-full h-auto rounded-xl object-cover"
        />
      </section>
    </div>
  );
};

export default PlantDetails;
