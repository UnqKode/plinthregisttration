"use client";

import React from "react";
import { motion } from "framer-motion";
import { Orbitron } from "next/font/google";
import { 
  Award, 
  Ticket, 
  Gift, 
  Music, 
  FileSignature, 
  Home, 
  Instagram, 
  Phone,
  ExternalLink 
} from "lucide-react";
import { useRouter } from "next/navigation";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const perks = [
  { icon: Award, title: "Certificates", desc: "Official recognition of your contribution" },
  { icon: Ticket, title: "Free Entry & Registration", desc: "Full access to all technical events" },
  { icon: Gift, title: "Exclusive Goodies", desc: "Merchandise and swag kits" },
  { icon: Music, title: "Pronite Passes", desc: "VIP access to celebrity nights" },
  { icon: FileSignature, title: "Letter of Recommendation", desc: "Boost your professional profile" },
  { icon: Home, title: "Free Accommodation", desc: "Stay comfortably during the fest" },
];

export default function AmbassadorPage() {

    const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1592561199818-6b69d3d1d6e2?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Space Background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black"></div>
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 py-20 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-blue-400 font-bold tracking-wider text-sm sm:text-base mb-2 uppercase">
            Join the Revolution
          </h2>
          <h1
            className={`${orbitron.className} text-4xl sm:text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] mb-6`}
          >
            CAMPUS AMBASSADOR
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Become the face of your college for Rajasthan’s grandest
            Techno-Management Fest — <strong className="text-white">PLINTH 2026</strong> at LNMIIT Jaipur! 🌟
          </p>
        </motion.div>

        {/* Perks Grid */}
        <motion.div 
          variants={itemVariants} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-16"
        >
          {perks.map((perk, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-blue-500/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                <perk.icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{perk.title}</h3>
              <p className="text-gray-400 text-sm">{perk.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <p className="text-2xl text-white font-semibold mb-8">
            Join now and be part of something <span className="text-blue-400">extraordinary!</span> ✨
          </p>
            <button
                onClick={() => router.push("/ambassador-register")}
              className="relative z-10 inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.3)] group"
            >
              <span>Apply Now</span>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </motion.div>

        {/* Contact Footer */}
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-2xl bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-2">Contact for Queries</h4>
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Phone className="w-5 h-5 text-blue-400" />
              <span className="text-xl font-semibold text-white">Kaustubh Sharma</span>
            </div>
            <a href="tel:7976533847" className="text-gray-400 hover:text-white transition-colors block mt-1 ml-8">
              +91 79765 33847
            </a>
          </div>

          <div className="h-px w-full md:w-px md:h-12 bg-gray-700" />

          <a
            href="https://www.instagram.com/plinth.lnmiit?igsh=Ymo4dnM0ZXhxbnN5"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <div className="w-12 h-12 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-400 uppercase">Follow us on</p>
              <p className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors">Instagram</p>
            </div>
          </a>
        </motion.div>

      </motion.div>
    </div>
  );
}
