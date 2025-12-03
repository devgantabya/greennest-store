import React, { useState } from "react";

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "We usually ship within 2-3 business days. Delivery inside the city takes 3-5 days and outside may take up to 7 days.",
  },
  {
    question: "How do I repot my plant?",
    answer:
      "Choose a pot 1-2 inches larger than the current one, use fresh potting soil, remove the plant gently, place it in the new pot, and water lightly.",
  },
  {
    question: "What type of soil should I use?",
    answer:
      "Most indoor plants prefer a well-draining potting mix with perlite. Succulents need sandy soil, while tropical plants prefer moisture-retentive soil.",
  },
  {
    question: "How often should I water my indoor plants?",
    answer:
      "Most indoor plants need watering once a week. Always check the top 1–2 inches of soil — if it’s dry, water it. Overwatering is more harmful than underwatering.",
  },
  {
    question: "Why are my plant’s leaves turning yellow?",
    answer:
      "Yellow leaves usually indicate overwatering, poor drainage, or lack of sunlight. Check your watering schedule and make sure the plant is getting proper light.",
  },
  {
    question: "Do indoor plants need fertilizer?",
    answer:
      "Yes, but only during the growing season (spring and summer). Use a balanced liquid fertilizer once a month to help plants stay healthy and vibrant.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
          Quick answers to the most common plant and order-related questions.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 border border-[#dce8d8] dark:border-gray-700 rounded-lg shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              {faq.question}
              <span className="text-xl dark:text-gray-300">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600 dark:text-gray-400">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
