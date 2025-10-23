import React, { use, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { toast } from "react-toastify";
import errorPlant from "../assets/404 plant.jpg";

const PlantDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
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
        const matchingData = data.find((p) => p.plantId === parseInt(id));
        setPlant(matchingData);
        setLoading(false);
      });
  }, [id]);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Consultation booked successfully!");
    setForm({ name: "", email: "" });
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!plant)
    return (
      <div className="flex justify-center items-center h-screen">
        <title>GreenNest - Plant Not found</title>
        <div className="text-center">
          <img className="w-auto h-90 mx-auto" src={errorPlant} alt="" />
          <h1 className="text-[#001931] font-semibold text-5xl leading-15 ">
            Opps! Plant not found!
          </h1>
          <Link
            to="/plants"
            className="bg-green-500 py-2 px-4 text-white rounded text-base font-semibold"
          >
            <button className="mt-8">Go Back!</button>
          </Link>
        </div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-xl">
      <title>{`GreenNest - ${plant.plantName}`}</title>
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={plant.image}
          alt={plant.plantName}
          className="w-full md:w-1/2 rounded-xl object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">{plant.plantName}</h2>
          <p className="text-gray-600 mb-3">{plant.description}</p>
          <p className="text-lg font-semibold">💲Price: ${plant.price}</p>
          <p className="text-lg">⭐ Rating: {plant.rating}</p>
          <p className="text-lg">📦 Stock: {plant.availableStock}</p>
        </div>
      </div>

      <div className="mt-10 border-t pt-6">
        <h3 className="text-2xl font-semibold mb-4">Book Consultation</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full p-3 border rounded-md focus:outline-green-500"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full p-3 border rounded-md focus:outline-green-500"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlantDetails;
