"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Orbitron } from "next/font/google";
import { FileText, Users, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});

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

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const router = useRouter();

  useEffect(() => {
    // Target date: Jan 23, 2026
    const targetDate = new Date("2026-01-23T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center mx-2 sm:mx-4">
      <div
        className={`${orbitron.className} text-2xl sm:text-4xl md:text-5xl font-bold text-white bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 sm:p-4 min-w-[70px] sm:min-w-[90px] md:min-w-[100px] shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-xs sm:text-sm text-gray-400 mt-2 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={fadeUp}
      className="text-center  w-full px-4"
    >
      <motion.h1
        className={` ${orbitron.className} text-5xl sm:text-6xl  md:text-8xl font-black mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]`}
        variants={fadeUp}
      >
        PLINTH
      </motion.h1>

      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-gray-400 to-white mx-auto mb-6 rounded-full"
        variants={scaleUp}
      />

      <motion.p
        className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10"
        variants={fadeUp}
      >
        Where{" "}
        <span className="text-white font-semibold">
          technology meets excitement
        </span>
        . Dive into a world of innovation, creativity, and unforgettable
        experiences.
      </motion.p>

      {/* Countdown Timer */}
      <motion.div
        className="flex justify-center flex-wrap mb-12"
        variants={scaleUp}
        custom={0.2}
      >
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <TimeUnit value={timeLeft.seconds} label="Secs" />
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
        variants={fadeUp}
        custom={0.4}
      >
        <button
          className="group relative px-6 py-3 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white font-semibold transition-all hover:bg-white/10 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 overflow-hidden"
          onClick={() => window.open("https://drive.google.com/file/d/18FIZ_ufcTzseg5CfzYNeRziV590GhmOU/view?usp=drive_link", "_blank")} // Replace with actual link
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          <FileText className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
          <span>Event Brochure</span>
        </button>

        <button
          className="group px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/40 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          onClick={() => router.push("/ambassador", "_blank")} // Replace with actual link
        >
          <Users className="w-5 h-5" />
          <span>Campus Ambassador</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </motion.div>
  );
}
