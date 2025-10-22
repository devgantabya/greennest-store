import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const Home = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/plants.json")
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch plants.json", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  const experts = plants.filter(
    (plant, index, self) =>
      index === self.findIndex((p) => p.providerName === plant.providerName)
  );

  return (
    <div className="space-y-20">
      <section className="relative h-[500px] mb-20">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 4000 }}
          loop
        >
          {plants.map((plant) => (
            <SwiperSlide key={plant.plantId}>
              <div className="h-[500px] flex items-center justify-center bg-[#e9eae5] relative">
                <img
                  src={plant.image}
                  alt={plant.plantName}
                  className="h-full w-full object-contain rounded-lg shadow-lg"
                />
                <div className="absolute left-10 bottom-10 text-white text-4xl font-bold shadow-lg p-2 bg-green-400 rounded">
                  {plant.plantName} - {plant.careLevel} Care!
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="px-10">
        <div className="py-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Top Rated Indoor Plants
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Bring life to your space with our carefully curated collection of
            premium indoor plants
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {plants.slice(0, 4).map((plant) => (
            <div
              key={plant.plantId}
              className="rounded-xl bg-green-100 shadow-lg hover:shadow-xl transition relative"
            >
              <img
                src={plant.image}
                alt={plant.plantName}
                className="w-full h-60 object-contain rounded-t-xl p-2 bg-gray-200"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {plant.plantName}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold text-emerald-600">
                    ${plant.price}
                  </p>
                  <p className="mt-1 flex items-center gap-1 absolute top-2 right-5 bg-white px-3 py-1 rounded-2xl shadow">
                    <FaStar className="text-yellow-400" />
                    <span className="font-semibold">{plant.rating}</span>
                  </p>
                </div>
                <Link to={`/plants/${plant.plantId}`}>
                  <button className="cursor-pointer mt-3 px-4 font-semibold py-2 w-full bg-green-500 text-white rounded hover:bg-green-600">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-10 bg-green-50 py-16 rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Plant Care Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plants.slice(0, 3).map((plant) => (
            <div key={plant.plantId} className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">{plant.plantName}</h3>
              <p>Care Level: {plant.careLevel}</p>
              <p>{plant.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-10">
        <h2 className="text-3xl font-bold mb-6">Meet Our Green Experts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {experts.map((expert, index) => (
            <div key={index} className="text-center">
              <img
                src={expert.image}
                alt={expert.providerName}
                className="w-40 h-40 mx-auto rounded-full object-contain"
              />
              <h3 className="mt-4 font-semibold">{expert.providerName}</h3>
              <p className="text-green-600">Plant Specialist</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-10 bg-green-50 py-16 rounded-lg">
        <div className="py-12 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Eco Decor Ideas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Eco-decor with plants uses natural or recycled materials, like woven
            baskets or up cycled containers, arranging plants on shelves,
            hanging terrariums, or tabletops to add life and texture to your
            home.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {plants.slice(0, 8).map((plant) => (
            <div
              key={plant.plantId}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={plant.decorImage}
                alt={plant.plantName}
                className="w-full h-50 object-cover"
              />
              <div className="text-xl p-2 font-bold bg-green-50 text-center uppercase">
                {plant.plantName}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
