"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Home, Mail } from "lucide-react";
import { useData } from "../../../context/form.context";

export default function ThankYouPage() {
  const router = useRouter();
  const { formData, setFormData } = useData();

  useEffect(() => {
    if (!formData?.day) {
      router.replace("/");
    }
  }, [formData, router]);

  // Handle "Go Home" - optionally clear data here if you want to reset the flow
  const handleGoHome = () => {
    setFormData({}); // Clear data to prevent re-submission or navigating back
    router.push("/");
  };

  if (!formData?.day) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Space Background"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-lg w-full bg-gray-900/40 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-3xl text-center shadow-2xl shadow-blue-500/10"
      >
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="w-24 h-24 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/30"
        >
            <CheckCircle className="w-12 h-12 text-white" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-6">
          Thank You!
        </h1>

        <p className="text-xl text-gray-200 font-medium mb-4">
          Registration Confirmed
        </p>

        <p className="text-gray-400 leading-relaxed mb-8">
          Thank you for registering with us. Our team will reach out to you via
          email after confirming your payment details.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
                onClick={handleGoHome}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-300 text-white font-semibold"
            >
                <Home className="w-5 h-5" />
                Return Home
            </button>
            
            <a
                href="mailto:plinth@lnmiit.ac.in"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-lg shadow-blue-500/20 transition-all duration-300 text-white font-semibold"
            >
                <Mail className="w-5 h-5" />
                Contact Support
            </a>
        </div>
      </motion.div>
    </div>
  );
}
