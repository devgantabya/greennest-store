import React, { useEffect, useState } from "react";
import aliceGreen from "../assets/Team-members/Alice Green.jpeg";
import bobLeaf from "../assets/Team-members/Bob-leaf.png";
import claraRoot from "../assets/Team-members/Clara-root.webp";
import davidStem from "../assets/Team-members/David-stem.jpg";
import ourMission from "../assets/oyr-mission.webp";

const AboutUs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  if (loading)
    return (
      <div className="text-center mt-20 h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-xl text-success"></span>
      </div>
    );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <section className="px-4 container mx-auto py-14 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-snug">
            About GreenNest
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            GreenNest is an elegant indoor plant store and care platform built
            for plant lovers. Discover, nurture, and decorate your home with
            healthy indoor plants while getting expert guidance for a greener,
            healthier living space.
          </p>
        </div>

        <div className="mb-24">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center md:text-left">
                Our Mission
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed text-center md:text-left">
                Our mission is to bring the beauty and serenity of nature into
                every home by making indoor greenery accessible, enjoyable, and
                deeply rewarding. At GreenNest, we believe that plants do far
                more than simply decorate a room—they breathe life into spaces,
                uplift moods, improve air quality, and create a sense of harmony
                that modern living often lacks. We are committed to helping
                people reconnect with nature, even within the busiest urban
                environments. Through our carefully curated selection of premium
                indoor plants, we ensure that every customer receives healthy,
                vibrant greenery that can truly thrive. But we don't stop there.
                To make plant care easier and more fulfilling, we offer in-depth
                care guides, seasonal tips, and expert recommendations designed
                to support plant lovers of all skill levels—from complete
                beginners to passionate enthusiasts.
              </p>
            </div>

            <div className="md:w-1/2">
              <img
                src={ourMission}
                alt="Our Mission"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                What We Offer
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                GreenNest provides everything you need to grow a vibrant indoor
                garden — from hand-picked plants to expert care support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                "Curated selection of healthy indoor plants",
                "Detailed plant care guides and tips",
                "Expert consultation booking for plant care",
                "Decor inspiration for greener living spaces",
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-green-50 dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-transform duration-300 hover:scale-105"
                >
                  <p className="text-gray-700 dark:text-gray-200 font-semibold text-lg">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Meet the Team
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Our dedicated team of plant enthusiasts and developers work
            tirelessly to bring GreenNest to life, helping you nurture your
            indoor garden with care and style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {[
            {
              img: aliceGreen,
              name: "Alice Green",
              role: "Founder & Plant Expert",
            },
            { img: bobLeaf, name: "Bob Leaf", role: "Head of Plant Care" },
            { img: claraRoot, name: "Clara Root", role: "UI/UX Designer" },
            { img: davidStem, name: "David Stem", role: "Fullstack Developer" },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-transform duration-300 hover:scale-105"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover transition-transform duration-300 hover:scale-105"
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
