"use client";

import React from "react";
import { useScroll, useTransform, motion } from "framer-motion";

import RegisterButton from "../../components/RegisterButton";
import HeroSection from "../../components/HeroSection";
import ContactAndInfo from "../../components/ContactAndInfo";
import ExperienceSelector from "../../components/ExperienceSelector";
import DiscountsAndRegistration from "../../components/DiscountsAndRegistration";
import FooterSection from "../../components/FooterSection";

export default function Page() {
  const { scrollYProgress } = useScroll();
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const glowOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 1],
    [0.3, 0.5, 0.2]
  );

  return (
    <div className="relative min-h-screen w-full bg-black text-gray-100 overflow-hidden">
      {/* High-quality background image to replace heavy JS effects */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2000&auto=format&fit=crop" 
          alt="Space Background" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black"></div>
      </div>

      <motion.div
        style={{
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.15), transparent 60%)",
          y: glowY,
          opacity: glowOpacity,
        }}
        className="absolute top-0 left-0 w-full h-[150vh] blur-[100px] z-[2]"
      />

      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]) }}
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] z-[3]"
      />

      <div className="relative z-10 px-6 py-12 max-w-6xl mx-auto space-y-24">
        <HeroSection />

        <ContactAndInfo />

        <ExperienceSelector />

        <DiscountsAndRegistration />

        <div className="flex items-center justify-center  ">
          <RegisterButton />
        </div>

        <FooterSection />
      </div>
    </div>
  );
}
