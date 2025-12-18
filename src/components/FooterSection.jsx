"use client";

import React from "react";
import { motion } from "framer-motion";
import gdg from "../../public/gdg.svg"
import Image from "next/image"

export default function FooterSection() {
  return (
    <motion.div
  className="text-center mt-12 pt-6 border-t border-gray-800 sm:mt-16 sm:pt-8 space-y-2"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 1.2 }}
>
  <p className="text-gray-500 text-xs sm:text-sm tracking-wide">
    Welcome to <span className="text-white font-semibold">Plinth</span>{" "}
    — Where Technology Meets Excitement
  </p>

  <p className="text-gray-600 text-xs sm:text-sm flex items-center justify-center gap-2">
    Designed &amp; Developed by
    <span className="inline-flex items-center gap-1 text-white font-medium">
      <Image
        src={gdg}
        alt="GDG LNMIIT Logo"
        width={20}
        height={20}
        className="inline-block"
      />
      GDG LNMIIT
    </span>
  </p>
</motion.div>

  );
}
