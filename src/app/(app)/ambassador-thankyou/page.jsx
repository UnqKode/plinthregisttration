"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles, Home } from "lucide-react";

export default function AmbassadorThankYouPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1641800625222-26d09b9e6d03?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Space Background"
          className="w-full h-full object-cover "
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-lg w-full bg-gray-900/40 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl text-center shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 bg-gradient-to-tr from-white to-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30"
        >
          <Sparkles className="w-10 h-10 text-white" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Welcome Aboard!
        </h1>

        <p className="text-gray-300 text-lg mb-6 leading-relaxed">
          Thank you for applying to be a <span className="text-purple-400 font-semibold">Plinth Campus Ambassador</span>.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
          <p className="text-gray-400 text-sm">
            Our team will verify your details and reach out to you via email shortly. You will receive your unique <span className="text-white font-bold">Referral Code</span> and further instructions in that email.
          </p>
        </div>

        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-white font-medium group"
        >
          <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          Back to Home
        </button>
      </motion.div>
    </div>
  );
}
