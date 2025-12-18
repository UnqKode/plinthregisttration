"use client";

import React from "react";
import { motion } from "framer-motion";

const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { delay, duration: 0.6, type: "spring", stiffness: 80 },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function ContactAndInfo() {
  const contacts = [
    { name: "Kaustubh Sharma", role: "", phone: "7976533487" },
    { name: "Akshansh Singh", role: "", phone: "8448321696" },
    { name: "Jayant Singhal", role: "", phone: "7878194515" },
  ];

  const importantInfo = [
    "Pronite extends until 1 AM for everyone's enjoyment",
    "For your comfort and safety, we recommend enjoying the full night on campus instead of traveling late.",
    "Every ProNite pass comes with free accommodation, so just relax and enjoy the vibes. ",
    "Our team and volunteers are here round the clock , please cooperate and let's make Plinth '26 unforgettable and safe for everyone!",
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        variants={scaleUp}
        className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_40px_rgba(255,255,255,0.03)] hover:border-white/20 transition-all"
      >
        <h2 className="text-2xl font-bold mb-6 text-white">
          Contact Information
        </h2>
        <div className="space-y-4">
          {contacts.map((c, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i * 0.1}
              className="flex justify-between items-center bg-black/30 rounded-xl border border-white/10 p-4 hover:bg-white/10 transition"
            >
              <div>
                <p className="text-white font-semibold">{c.name}</p>
                {c.role && (
                  <p className="text-gray-400 text-sm">{c.role}</p>
                )}
              </div>
              <a
                href={`tel:${c.phone}`}
                className="text-white/90 border border-white/20 px-4 py-1.5 rounded-lg hover:bg-white/10"
              >
                {c.phone}
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={scaleUp}
        className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_40px_rgba(255,255,255,0.03)] hover:border-white/20 transition-all"
      >
        <h2 className="text-2xl font-bold mb-6 text-white">
           Before You Dive into the Magic
        </h2>
        <ul className="space-y-3 text-gray-300">
          {importantInfo.map((rule, i) => (
            <motion.li
              key={i}
              className="flex gap-2"
              variants={fadeUp}
              custom={i * 0.1}
            >
              <span className="w-2 h-2 bg-white rounded-full mt-2"></span>
              {rule}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
