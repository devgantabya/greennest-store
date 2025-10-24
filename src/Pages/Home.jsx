import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";
import PlantOfWeek from "../Component/Section/PlantOfWeek";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Home = () => {
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
      .catch((err) => {
        console.error("Failed to fetch plants.json", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center mt-20 h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-xl text-success"></span>
      </div>
    );

  const experts = plants.filter(
    (plant, index, self) =>
      index === self.findIndex((p) => p.providerName === plant.providerName)
  );

  return (
    <div className="space-y-15 md:space-y-20">
      <section className="relative w-full h-[550px]">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination, Navigation]}
          effect="fade"
          speed={1200}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          loop={true}
          className="h-full w-full"
        >
          {plants.map((plant) => (
            <SwiperSlide key={plant.plantId}>
              <div className="relative h-full w-full">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${plant.decorImage})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
                </div>

                <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
                  <div className="grid md:grid-cols-2 gap-5 items-center w-full">
                    <div className="text-white space-y-6 animate-fade-in">
                      <h1 className="text-5xl md:text-5xl lg:text-7xl font-bold leading-tight">
                        {plant.plantName}
                      </h1>

                      <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-xl">
                        {plant.description}
                      </p>

                      <div className="flex items-center gap-6 pt-4">
                        <div className="flex items-center gap-2">
                          <FaStar className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-lg font-semibold">
                            {plant.rating}
                          </span>
                        </div>
                        <div className="h-6 w-px bg-white/30" />
                        <div className="text-sm">
                          <span className="text-gray-300">Care Level:</span>
                          <span className="ml-2 font-semibold">
                            {plant.careLevel}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-8 border-t border-white/20">
                        <img
                          src={plant.expertImage}
                          alt={plant.expertName}
                          className="w-12 h-12 rounded-full border-2 border-white/30 object-cover"
                        />
                        <div>
                          <p className="text-sm text-gray-300">Plant Expert</p>
                          <p className="font-semibold">{plant.expertName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="hidden lg:flex justify-center items-center">
                      <div className="relative animate-float">
                        <div className="absolute inset-0 bg-[#209d50]/20 blur-3xl rounded-full" />
                        <img
                          src={plant.image}
                          alt={plant.plantName}
                          className="relative w-full max-w-lg h-auto object-contain drop-shadow-2xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="px-4 md:px-10">
        <div className="py-0 md:py-12 md:text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-12 tracking-tight">
            Top Rated Indoor Plants
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-4 mx-auto">
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
                <h3 className="text-2xl md:text-xl font-bold text-gray-900 mb-2">
                  {plant.plantName}
                </h3>
                <div className="flex justify-between items-center">
                  <p className="text-2xl font-bold text-[#209d50]">
                    ${plant.price}
                  </p>
                  <p className="mt-1 flex items-center gap-1 absolute top-2 right-5 bg-white px-3 py-1 rounded-2xl shadow">
                    <FaStar className="text-yellow-400" />
                    <span className="font-semibold">{plant.rating}</span>
                  </p>
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

      <section className="px-4 md:px-10 bg-green-50 py-8 md:py-16 rounded-lg">
        <h2 className="text-4xl font-bold mb-6">Plant Care Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Water Wisely</h3>
            <p>
              Check the soil before watering; most plants prefer their soil to
              dry slightly between waterings. Avoid over watering to prevent
              root rot.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Give Proper Light</h3>
            <p>
              Place your plants according to their light needs: bright sunlight
              for sun-loving plants, indirect light for low-light species.
              Rotate them occasionally for even growth.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Prune and Clean</h3>
            <p>
              Remove dead or yellowing leaves and wipe dust off foliage. This
              keeps plants healthy and helps them grow stronger.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 md:px-10">
        <h2 className="text-4xl font-bold mb-12">Meet Our Green Experts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {experts.map((expert, index) => (
            <div key={index} className="text-center">
              <img
                src={expert.expertImage}
                alt={expert.expertName}
                className="w-90 h-90 md:w-60 md:h-60 mx-auto rounded-lg object-contain"
              />
              <h3 className="mt-4 text-2xl md:text-xl font-semibold">
                {expert.expertName}
              </h3>
              <p className="text-[#209d50] text-xl font-medium md:text-base">
                Plant Specialist
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 md:px-10 bg-green-50 py-10 md:py-16 rounded-lg">
        <div className="py-0 md:py-12 md:text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Eco Decor Ideas
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
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

      <section className=" px-4 md:px-10 pb-10 md:pb-16 pt-2 md:pt-5 rounded-lg ">
        <PlantOfWeek></PlantOfWeek>
      </section>
    </div>
  );
};

export default Home;
