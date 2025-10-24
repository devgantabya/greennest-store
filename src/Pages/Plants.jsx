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
    <div className="container mx-auto px-4 pb-8 pt-0 md:pt-8">
      <title>GreenNest - Plants</title>
      <section className="">
        <div className="py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
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
              className="relative rounded-xl bg-green-100 shadow-lg hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={plant.image}
                alt={plant.plantName}
                className="w-full h-60 object-contain rounded-t-xl p-2 bg-gray-100"
              />
              <div className="p-4">
                <h3 className="text-2xl md:text-xl font-bold text-gray-900 mb-2">
                  {plant.plantName}
                </h3>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-2xl font-bold text-[#209d50]">
                    ${plant.price}
                  </p>
                  <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-2xl shadow absolute top-4 right-4 ">
                    <FaStar className="text-yellow-400" />
                    <span className="font-semibold">{plant.rating}</span>
                  </div>
                </div>
                <Link to={`/plants/${plant.plantId}`}>
                  <button className="cursor-pointer text-xl mt-3 px-4 font-semibold py-2 w-full bg-[#209d50] text-white rounded hover:bg-[#12863f]">
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
