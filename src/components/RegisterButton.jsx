// src/components/RegisterButton.jsx
"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function RegisterButton() {
  const router = useRouter();

  return (
    <motion.button
      onClick={() => router.push("/register")}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 20px rgba(255,255,255,0.2)",
      }}
      whileTap={{ scale: 0.95 }}
      className="relative min-w-[25vw] overflow-hidden px-8 py-3 rounded-xl bg-black text-white font-semibold tracking-wide border border-gray-700 transition-all duration-300 hover:border-white hover:text-black"
    >
      <span className="relative z-10 ">Register</span>
      <motion.span
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-white blur-md opacity-30"
      ></motion.span>
    </motion.button>
  );
}
