import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setPlants(data);
          setLoading(false);
        }, 500);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading)
    return (
      <div className="text-center mt-20 h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-xl text-success"></span>
      </div>
    );

  return (
    <div className="">
      <title>GreenNest - Plants</title>
      <section className="px-4 container mx-auto py-10 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-snug tracking-tight">
            Our Plants
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked indoor plants that brighten your space and purify the
            air.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {plants.map((plant) => (
            <div
              key={plant.plantId}
              className="rounded-xl bg-white shadow-md hover:shadow-2xl transition-transform transform hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="overflow-hidden rounded-t-xl">
                <img
                  src={plant.image}
                  alt={plant.plantName}
                  className="w-full h-64 object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-5 flex flex-col gap-3">
                <h3 className="text-xl font-bold text-gray-900">
                  {plant.plantName}
                </h3>

                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold text-green-600">
                    ${plant.price}
                  </p>
                  <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow">
                    <FaStar className="text-yellow-400" />
                    <span className="font-semibold">{plant.rating}</span>
                  </div>
                </div>

                <Link to={`/plants/${plant.plantId}`}>
                  <button className="mt-3 w-full bg-green-600 text-white font-semibold py-2 rounded-lg transition-colors hover:bg-green-700">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Plants;
