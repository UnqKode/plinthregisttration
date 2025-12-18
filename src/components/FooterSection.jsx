"use client";

import React from "react";
import { motion } from "framer-motion";

export default function FooterSection() {
  return (
    <motion.div
      className="text-center mt-12 pt-6 border-t border-gray-800 sm:mt-16 sm:pt-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2 }}
    >
      <p className="text-gray-500 text-xs sm:text-sm tracking-wide">
        Welcome to <span className="text-white font-semibold">Plinth</span>{" "}
        — Where Technology Meets Excitement
      </p>
    </motion.div>
  );
}
