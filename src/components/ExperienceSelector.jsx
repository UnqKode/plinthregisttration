"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay, duration: 0.6, type: "spring", stiffness: 80 },
  }),
};

export default function ExperienceSelector() {
  const packages = [
    {
      title: "Single Day Pass",
      price: "₹499",
      desc: "One thrilling day packed with events, music, and memories!",
      perks: [
        " Full-day access to all events and the ProNite of your chosen day ",
        "Free participation in one flagship event of your choice ",
        "Access to fest food stalls, fun zones, and after-hour hangouts",
        "Special festival kit with goodies & badges",
      ],
    },
    {
      title: "3-Day Power Pass",
      price: "₹999",
      desc: "The ultimate 3-day fest adventure — all access, all excitement!",
      perks: [
        "Complimentary access to Pronites & workshops for 3 days",
        "Complimentary accommodation for the entire fest duration.",
        "Free participation in any one flagship event",
        "Free participation in any one fun event ",
        "Exclusive access to premium zones, after parties, and artist meet & greets ",
        "Get your official Plinth '26 wristband & fest kit"
      ],
      featured: true,
    },
    {
      title: "Event Participation",
      price: "₹199",
      desc: "Join additional events and make your fest even bigger!",
      perks: [
        "Access to one extra event of your choice",
        "No limit — participate in as many as you like!",
      ],
    },
  ];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      className="space-y-10"
    >
      <motion.div className="text-center" variants={fadeUp}>
        <h2 className="text-3xl sm:text-5xl font-bold text-white mb-3">
          Choose Your Experience
        </h2>
        <p className="text-gray-400">
          Select the pass that fits your adventure
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((p, i) => (
          <motion.div
            key={p.title}
            variants={scaleUp}
            custom={i * 0.2}
            className={`rounded-2xl p-8 border ${
              p.featured
                ? "bg-white/10 border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.1)] scale-105"
                : "bg-white/5 border-white/10"
            } backdrop-blur-xl hover:border-white/30 transition-all`}
          >
            <div className="flex justify-between items-center">

            {p.featured && (
              <p className="text-xs mb-2 bg-white text-black px-3 py-1 rounded-full inline-block font-semibold">
                MOST POPULAR
              </p>
            )}
            {p.featured && (
              <p className="text-xs mb-2 bg-yellow-300 text-black px-3 py-1 rounded-full inline-block font-semibold">
                EARLY BIRD OFFER
              </p>
            )}
            </div>
            <h3 className="text-xl font-bold text-white">{p.title}</h3>
            <p className="text-3xl font-bold text-white my-3">
              {p.price === "₹499" && (
                <span className="line-through text-gray-400 mr-2">
                  ₹699
                </span>
              )}
              {p.price === "₹999" && (
                <span className="line-through text-gray-400 mr-2">
                  ₹1199
                </span>
              )}
              <span>{p.price}</span>
            </p>

            <p className="text-gray-400 mb-4">{p.desc}</p>
            <ul className="space-y-2 mb-6">
              {p.perks.map((perk, j) => (
                <li key={j} className="text-gray-300 flex gap-2">
                  <span className="w-2 h-2 bg-white rounded-full mt-2"></span>
                  {perk}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
