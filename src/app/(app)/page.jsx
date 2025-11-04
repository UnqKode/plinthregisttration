"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Meteors } from "../../components/ui/meteors";
import { Particles } from "../../components/ui/particles";
import RegisterButton from "../../components/RegisterButton";
import { Orbitron } from "next/font/google";

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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5 },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

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
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles />
      </div>
      <Meteors />

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
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          className="text-center"
        >
          <motion.h1
            className={` ${orbitron.className} text-5xl sm:text-6xl md:text-8xl font-black mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]`}
            variants={fadeUp}
          >
            PLINTH
          </motion.h1>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-gray-400 to-white mx-auto mb-6 rounded-full"
            variants={scaleUp}
          />

          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            variants={fadeUp}
          >
            Where{" "}
            <span className="text-white font-semibold">
              technology meets excitement
            </span>
            . Dive into a world of innovation, creativity, and unforgettable
            experiences.
          </motion.p>
        </motion.div>

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
              {[
                { name: "Akshansh Singh", role: "", phone: "8448321696" },
                { name: "Jayant Singhal", role: "", phone: "7878194515" },
                { name: "Kaustubh Sharma", role: "", phone: "7976533487" },
              ].map((c, i) => (
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
              Event Guidelines
            </h2>
            <ul className="space-y-3 text-gray-300">
              {[
                "Pronite extends until 1 AM for everyone's enjoyment",
                "Attendees are discouraged from leaving after Pronite for safety",
                "Complimentary accommodation with every Pronite pass",
                "Your safety is our top priority — please cooperate",
              ].map((rule, i) => (
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
            {[
              {
                title: "Single Day Pass",
                price: "₹699",
                desc: "One thrilling day packed with events, music, and memories!",
                perks: [
                  "Full-day access to all events and the pronite of your chosen day",
                  "Free participation in one event of your choice",
                  "Option without accommodation: ₹499",
                  "Room upgrade for later available for ₹299",
                ],
              },
              {
                title: "3-Day Power Pass",
                price: "₹1199",
                desc: "The ultimate 3-day fest adventure — all access, all excitement!",
                perks: [
                  "Unlimited access to all events and pronites for 3 days",
                  "Free participation in any 3 events of your choice",
                  "Exclusive entry to premium fest experiences and fun zones",
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
            ].map((p, i) => (
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
                {p.featured && (
                  <p className="text-xs mb-2 bg-white text-black px-3 py-1 rounded-full inline-block font-semibold">
                    MOST POPULAR
                  </p>
                )}
                <h3 className="text-xl font-bold text-white">{p.title}</h3>
                <p className="text-3xl font-black text-white my-3">{p.price}</p>
                <p className="text-gray-400 mb-4">{p.desc}</p>
                <ul className="space-y-2 mb-6">
                  {p.perks.map((perk, j) => (
                    <li key={j} className="text-gray-300 flex gap-2">
                      <span className="w-2 h-2 bg-white rounded-full mt-2"></span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 rounded-xl font-semibold ${
                    p.featured
                      ? "bg-white text-black hover:bg-gray-200"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  } transition`}
                >
                  Select
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
              className="text-gray-300 mb-3 text-sm sm:text-base sm:mb-4"
              variants={fadeInUp}
              custom={0.4}
              >
              Planning with{" "}
              <span className="text-yellow-400 font-semibold">
                10 or more friends?
              </span>{" "}
              Get exclusive discounts and added perks!
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
              {[
                "Fill in your contact information",
                "Choose your package",
                "Pay using QR code",
                "Submit form & receive pass",
              ].map((step, index) => (
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

        <div className="flex items-center justify-center  ">
          <RegisterButton />
        </div>

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
      </div>
    </div>
  );
}
