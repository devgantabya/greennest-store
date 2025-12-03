import React from "react";
import plantWeekImage from "../../assets/Monstera Deliciosa.webp";
import { PiPlantThin } from "react-icons/pi";
import { CiLight } from "react-icons/ci";
import { GiWateringCan } from "react-icons/gi";

const PlantOfWeek = () => {
  const plant = {
    name: "Monstera Deliciosa",
    scientificName: "Monstera deliciosa",
    description:
      "The Swiss Cheese Plant is a stunning tropical houseplant known for its dramatic, glossy leaves with natural splits and holes. Native to Central American rainforest, it brings a bold architectural element to any space while being surprisingly easy to care for.",
    image: plantWeekImage,
    lightRequirement: "Bright Indirect",
    waterFrequency: "Weekly",
    careLevel: "Easy",
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 tracking-tight">
          Plant of the Week
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
          Discover our carefully selected botanical treasure
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="h-96 md:h-auto overflow-hidden group">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
            />
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {plant.name}
              </h2>
              <p className="text-lg text-gray-500 italic">
                {plant.scientificName}
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-8 text-lg">
              {plant.description}
            </p>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Care Requirements
              </h3>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                  <div className="flex-shrink-0 w-12 h-12  flex items-center justify-center">
                    <span>
                      <PiPlantThin size={40} className="text-green-500" />
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-medium">
                      Difficulty
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {plant.careLevel}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <span>
                      <CiLight size={40} className="text-yellow-700" />
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-medium">Light</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {plant.lightRequirement}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center">
                    <span>
                      <GiWateringCan size={40} className="text-gray-600" />
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-medium">
                      Watering
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {plant.waterFrequency}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantOfWeek;
