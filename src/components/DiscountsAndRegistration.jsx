"use client";

import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5 },
  }),
};

export default function DiscountsAndRegistration() {
  const registrationSteps = [
    "Fill in your contact information",
    "Choose your package",
    "Pay using QR code",
    "Submit form & receive pass",
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-yellow-400/50 transition-all duration-500 sm:p-8 flex justify-between items-center flex-col"
        variants={cardVariants}
        custom={0.2}
        whileHover={{ scale: 1.02 }}
      >
        <div>
          <div className="flex items-center mb-4 sm:mb-6 relative">
            <motion.div
              className="w-2 h-6 bg-yellow-400 rounded-r-lg mr-3 sm:w-3 sm:h-8 sm:mr-4 relative"
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span
                className="absolute inset-0 rounded-r-lg blur-md bg-yellow-400/50 opacity-70"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <h2 className="text-xl font-bold text-white sm:text-2xl tracking-wide">
              Group Discounts
            </h2>
          </div>

          <motion.p
            className="text-gray-300 mb-3 text-sm sm:text-base sm:mb-4 w-full flex-col"
            variants={fadeInUp}
            custom={0.4}
          >
            Bringing your{" "}
            <span className="text-yellow-400 font-semibold">
              entire squad to Plinth?
            </span>{" "}
            
Contact for Discounts & Details: 
          </motion.p>
        </div>
        <motion.div
          className="bg-black/30 border border-yellow-400/20 rounded-xl p-3 w-full sm:p-4 text-center"
          whileHover={{
            borderColor: "rgba(255,255,255,0.5)",
            scale: 1.03,
          }}
        >
          <p className="text-white font-semibold text-sm sm:text-base">
            Contact: <span className="text-yellow-400">7976533487</span>
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-green-400/50 transition-all duration-500 sm:p-8"
        variants={cardVariants}
        custom={0.4}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center mb-4 sm:mb-6 relative">
          <motion.div
            className="w-2 h-6 bg-green-400 rounded-r-lg mr-3 sm:w-3 sm:h-8 sm:mr-4 relative"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.span
              className="absolute inset-0 rounded-r-lg blur-md bg-green-400/40 opacity-70"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          <h2 className="text-xl font-bold text-white sm:text-2xl tracking-wide">
            How to Register
          </h2>
        </div>

        <motion.ol
          className="space-y-3 sm:space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {registrationSteps.map((step, index) => (
            <motion.li
              key={index}
              className="flex items-center"
              variants={fadeInUp}
              custom={index * 0.2}
            >
              <motion.div
                className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center mr-3 text-xs sm:w-8 sm:h-8 sm:mr-4 sm:text-sm"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "rgba(34, 197, 94, 0.3)",
                }}
              >
                <span className="text-green-400 font-bold">
                  {index + 1}
                </span>
              </motion.div>
              <span className="text-gray-300 text-sm sm:text-base">
                {step}
              </span>
            </motion.li>
          ))}
        </motion.ol>

        <motion.div
          className="mt-4 p-3 bg-black/30 rounded-xl border border-gray-600 sm:mt-6 sm:p-4"
          whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.3)" }}
        >
          <p className="text-gray-400 text-center text-xs sm:text-sm">
            For queries, contact us at{" "}
            <span className="text-white font-semibold">7976533487</span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
